from keras.preprocessing.image import load_img, img_to_array
import pathlib
import numpy as np
import keras.backend as K
import matplotlib.pyplot as plt
import tensorflow as tf
import seaborn as sns
from sklearn.metrics import roc_auc_score, roc_curve, confusion_matrix, cohen_kappa_score
from dataclasses import dataclass

def normalize_pixels_from_to(image, _from_min = 0, _from_max = 255, _to_min = 0, _to_max = 1):
    """normalize pixels to be between _from_max and _from_min"""

    # Normalize between 0 and 1
    image_norm = (image - _from_min) / (_from_max - _from_min)

    # Normalize between 0 and 1
    image_norm = image_norm*(_to_max - _to_min) + _to_min 

    return image_norm

def load_image_norm(path, _min = 0, _max = 1):
    """load image from path and convert to array"""

    img = load_img(path, target_size=(224, 224), interpolation='bilinear')
    x = img_to_array(img)
    x = normalize_pixels_from_to(x, _to_min=_min, _to_max=_max)
    x = np.expand_dims(x, axis=0)
    return x

def shuffle_data(*arrays):
    """shuffle multiple arrays in unison"""

    np.random.seed(42)

    for array in arrays:
        assert len(array) == len(arrays[0])

    p = np.random.permutation(len(arrays[0]))
    return [array[p] for array in arrays]

def normalize(array, _min = 0, _max = 1):
    """normalize array"""

    _from_min = array.min()
    _from_max = array.max()

    return (array - _from_min) / (_from_max - _from_min) * (_max - _min) + _min

def pairwise_euclidean_distance(vects):
    x, y = vects
    return K.square(x - y)

def euclidean_distance(vects):
    euclidean_distance(vects[0], vects[1])
    
def euclidean_distance(x, y):
    return K.sqrt(K.sum(K.square(x - y), axis=1, keepdims=True))

def cosine_similarity(feature_1, feature_2):
    """calculate cosine similarity between two vectors"""

    return np.sum(feature_1 * feature_2) / (np.sqrt(np.sum(np.square(feature_1))) * np.sqrt(np.sum(np.square(feature_2))))

def load_images(path, _min_norm = 0, _max_norm = 1):
    """
    load images from path and convert to array

    Parameters
    ----------
    path : str
        path to images
    _min_norm : float
        minimum value for normalization
    _max_norm : float
        maximum value for normalization
    """

    data_dir = pathlib.Path(path)

    image_count = len(list(data_dir.glob('*/*.jpg')) + list(data_dir.glob('*/*.jpeg')) + list(data_dir.glob('*/*.png')))
    print("Total amount of images: " + str(image_count))

    folders = [x for x in data_dir.iterdir() if x.is_dir()]

    images_array_data = []

    for i, folder in enumerate(folders):
        images_array_data.append([])

        for j, img in enumerate(folder.iterdir()):
            images_array_data[i].append(load_image_norm(img, _min_norm, _max_norm))

    return images_array_data

def __get_random_index_from_array_that_is_not_equal_to(array, index):
    """get random index from array that is not equal to index"""

    if (len(array) <= 1):
        raise ValueError(len(array)," foulder(s) found in path, the pairing requires at least 2 folders")

    random_index = np.random.randint(0, len(array))
    while random_index == index:
        random_index = np.random.randint(0, len(array))
    return random_index

def create_triplets(folders):

    anchor_images = []
    positive_images = []
    negative_images = []
    
    for i, images in enumerate(folders):
        for j in range(len(images)):

            random_class_index = __get_random_index_from_array_that_is_not_equal_to(folders, i)

            image_anchor = images[j][0]
            image_positive = images[(j + 1) % len(images)][0]
            image_negative = folders[random_class_index][np.random.randint(0, len(folders[random_class_index]))][0]

            anchor_images.append(image_anchor)
            positive_images.append(image_positive)
            negative_images.append(image_negative)

    return np.array(anchor_images), np.array(positive_images), np.array(negative_images)

def create_pairs(folders):

    anchor_images, positive_images, negative_images  = create_triplets(folders)

    data = []
    labels = []

    for i in range(len(anchor_images)):
        data.append([anchor_images[i], positive_images[i]])
        labels.append(1)

        data.append([anchor_images[i], negative_images[i]])
        labels.append(0)

    return np.array(data), np.array(labels)
        

    # for i, images in enumerate(folders):
    #     for j in range(len(images)):

    #         random_class_index = __get_random_index_from_array_that_is_not_equal_to(folders, i)

    #         image_anchor = images[j][0]
    #         image_positive = images[(j + 1) % len(images)][0]
    #         image_negative = folders[random_class_index][np.random.randint(0, len(folders[random_class_index]))][0]

    #         data.append([image_anchor, image_positive])
    #         labels.append(1)

    #         data.append([image_anchor, image_negative])
    #         labels.append(0)

    # return np.array(data), np.array(labels)

"""
def create_pairs(path, _min_norm = 0, _max_norm = 1):

    images = __load_images(path, _min_norm, _max_norm)

    data = []
    labels = []

    for i, array in enumerate(images):
        for j in range(len(array)):
            data.append([
                array[j][0],
                array[(j + 1) % len(array)][0]
            ])
            labels.append(1)

            random_class_index = i
            # Requires more than 1 folder
            while random_class_index == i:
                random_class_index = np.random.randint(0, len(images))

            data.append([
                array[j][0],
                images[random_class_index][np.random.randint(0, len(images[random_class_index]))][0]
            ])
            labels.append(0)

    return np.array(data), np.array(labels)
"""

def split_data(*data, train_split = 0.8, val_split = 0.1, test_split = 0.1):
    """split data and labels into train and test sets"""

    train_split = int(len(data[0]) * train_split)
    val_split = int(len(data[0]) * val_split)
    test_split = int(len(data[0]) * test_split)

    # split elements of data into train, val and test sets

    return [[element[:train_split], element[train_split:train_split + val_split], element[train_split + val_split:]] for element in data]

    # train_data = data[:train_split]
    # val_data = data[train_split:train_split + val_split]
    # test_data = data[train_split + val_split:] 

    # return train_data, val_data, test_data

    # train_data = data[:train_split]
    # train_labels = labels[:train_split]

    # val_data = data[train_split:train_split + val_split]
    # val_labels = labels[train_split:train_split + val_split]

    # test_data = data[train_split + val_split:]
    # test_labels = labels[train_split + val_split:]

    # return train_data, train_labels, val_data, val_labels, test_data, test_labels

def visualize(data, labels, to_show=10):
    """Creates a plot of pairs and labels, and prediction if it's test dataset.

    Arguments:
        pairs: Numpy Array, of pairs to visualize, having shape
               (Number of pairs, 2, 28, 28).
        to_show: Int, number of examples to visualize (default is 6)
                `to_show` must be an integral multiple of `num_col`.
                 Otherwise it will be trimmed if it is greater than num_col,
                 and incremented if if it is less then num_col.
        predictions: Numpy Array of predictions with shape (to_show, 1) -
                     (default is None)
                     Must be passed when test=True.
        test: Boolean telling whether the dataset being visualized is
              train dataset or test dataset - (default False).

    Returns:
        None.
    """

    true_color = '#00ff00'
    false_color = '#ff0000'
    text_color = '#FFFFFF'
    scale = 2
    font_size = 14

    # Plot the images
    fig, axes = plt.subplots(1, to_show, figsize=(to_show*2*scale, 1*scale))

    plt.rcParams.update({'font.size': font_size, 'font.weight': 'bold', 'text.color': text_color})

    # Plot the pairs

    for i in range(to_show):
        axes[i].imshow((tf.concat([(data[i, 0]), (data[i, 1])], axis=1)), cmap='gray')

        status = "N/A"
        color = '#000000'
        if labels[i] == 1: 
            status = "Similar"
            color = true_color
        if labels[i] == 0: 
            status = "Different"
            color = false_color

        axes[i].set_xticks([])
        axes[i].set_yticks([])

        axes[i].spines['top'].set_visible(True)
        axes[i].spines['top'].set_color(color)
        axes[i].spines['right'].set_visible(False)
        axes[i].spines['bottom'].set_visible(False)
        axes[i].spines['left'].set_visible(False)

        axes[i].set_title(status)

    plt.show()

def visualize_images(*images, scale = 2):
    """Show image"""

    fig, axes = plt.subplots(1, 1, figsize=(len(images)*scale, 1*scale))

    axes.set_xticks([])
    axes.set_yticks([])

    axes.imshow((tf.concat([image for image in images], axis=1)), cmap='gray')
    plt.show()

@dataclass
class FinalData:
    img1: np.ndarray
    img2: np.ndarray
    label: int
    similarity: float
    prediction: int

def evaluate(data, labels, similarity, predictions = None, name="N/A", threshold=None):

    final_data_list = []

    def predict_label_from_similarity(similarity, threshold):
        if similarity > threshold:
            return 1
        else:
            return 0

    def calculate_optimal_threshold(labels, similarity):
        """Calculate optimal threshold for predictions"""

        current_threshold = 0
        best_threshold = 0
        best_accuracy = 0
        best_predictions = None
        current_accuracy = 0
        increase = 0.005

        while current_threshold <= 1:
            current_threshold += increase
            pred = []
            for i in range(len(similarity)):
                pred.append(predict_label_from_similarity(similarity[i], current_threshold))
            cm = confusion_matrix(labels, pred)

            amount_of_TP = cm[1, 1]
            amount_of_TN = cm[0, 0]
            amount_of_FP = cm[0, 1]
            amount_of_FN = cm[1, 0]

            current_accuracy = (amount_of_TP + amount_of_TN) / (amount_of_TP + amount_of_TN + amount_of_FP + amount_of_FN)

            if current_accuracy > best_accuracy:
                best_accuracy = current_accuracy
                best_threshold = current_threshold
                best_predictions = pred

        print("Best accuracy:", best_accuracy)

        return best_threshold, best_predictions

    if (threshold == None):
        threshold, predictions = calculate_optimal_threshold(labels, similarity)
    else:
        predictions = [predict_label_from_similarity(s, threshold) for s in similarity]

    for i in range(len(data)):
        final_data_list.append(FinalData(data[i][0], data[i][1], labels[i], similarity[i], predictions[i]))
    
    def plot_roc(roc):
        #plot roc
        plt.figure(figsize=(10,10))
        plt.plot(roc[0], roc[1])
        plt.title(name + " ROC")
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.show()

    def visualize_confusion_matrix(cm):
        cm = cm / cm.astype(float).sum(axis=1)
        figure = plt.figure(figsize=(8, 8))
        sns.heatmap(cm, annot=True,cmap=plt.cm.Blues)
        plt.tight_layout()
        plt.title(name + " Confusion Matrix")
        plt.ylabel('True label')
        plt.xlabel('Predicted label')
        plt.show()

    def visualize_data(final_data_list, to_show=10, offset=0):
    
        final_data_list_positive = sorted(final_data_list, key=lambda x: x.similarity, reverse=True)
        final_data_list_negative = sorted(final_data_list, key=lambda x: x.similarity, reverse=False)
        final_data_list_high_negative = sorted([x for x in final_data_list if x.label == 0], key=lambda x: x.similarity, reverse=True)
        final_data_list_low_positive = sorted([x for x in final_data_list if x.label == 1], key=lambda x: x.similarity, reverse=False)

        final_data_list_positive = final_data_list_positive[offset:offset+to_show]
        final_data_list_negative = final_data_list_negative[offset:offset+to_show]
        final_data_list_high_negative = final_data_list_high_negative[offset:offset+to_show]
        final_data_list_low_positive = final_data_list_low_positive[offset:offset+to_show]
        
        true_color = '#00ff00'
        false_color = '#ff0000'
        text_color = '#000000'
        scale = 2
        font_size = 5 * scale

        def __visualize(final_data_list):

            fig, axes = plt.subplots(1, to_show, figsize=(to_show*2*scale, 1*scale))

            plt.rcParams.update({'font.size': font_size, 'font.weight': 'bold', 'text.color': text_color})

            for i in range(len(final_data_list)):

                axes[i].imshow((tf.concat([(final_data_list[i].img1), (final_data_list[i].img2)], axis=1)), cmap='gray')   

                status = "N/A"
                color = '#000000'
                if final_data_list[i].label == 1: 
                    status = "Similar"
                    color = true_color
                if final_data_list[i].label == 0: 
                    status = "Different"
                    color = false_color

                axes[i].set_xticks([])
                axes[i].set_yticks([])

                axes[i].spines['top'].set_visible(True)
                axes[i].spines['top'].set_color(color)
                axes[i].spines['right'].set_visible(False)
                axes[i].spines['bottom'].set_visible(False)
                axes[i].spines['left'].set_visible(False)

                title = ""
                title += "Label: " + status + "\n"
                title += "Similarity: " + str(final_data_list[i].similarity) + "\n"
                title += "Prediction: " + str(final_data_list[i].prediction) + "\n"

                axes[i].set_title(title)

            plt.show()
        
        __visualize(final_data_list_positive)
        __visualize(final_data_list_negative)
        __visualize(final_data_list_high_negative)
        __visualize(final_data_list_low_positive)

    auc = roc_auc_score(labels, similarity)    
    roc = roc_curve(labels, similarity)
    kappa = cohen_kappa_score(labels, predictions)
    cm = confusion_matrix(labels, predictions)

    amount_of_TP = cm[1, 1]
    amount_of_TN = cm[0, 0]
    amount_of_FP = cm[0, 1]
    amount_of_FN = cm[1, 0]

    accuracy = (amount_of_TP + amount_of_TN) / (amount_of_TP + amount_of_TN + amount_of_FP + amount_of_FN)
    recall = amount_of_TP / (amount_of_TP + amount_of_FN)
    precision = amount_of_TP / (amount_of_TP + amount_of_FP)
    f1 = 2 * (precision * recall) / (precision + recall)

    print(name)
    print("- Amount of TP: " + str(amount_of_TP))
    print("- Amount of TN: " + str(amount_of_TN))
    print("- Amount of FP: " + str(amount_of_FP))
    print("- Amount of FN: " + str(amount_of_FN))
    print("- AUC score: " + str(auc))
    print("- Accuracy: " + str(accuracy))
    print("- Recall: " + str(recall))
    print("- Precision: " + str(precision))
    print("- F1: " + str(f1))
    print("- Kappa: " + str(kappa))

    plot_roc(roc)
    visualize_confusion_matrix(cm)
    visualize_data(final_data_list)
    print("Threshold: ", threshold)
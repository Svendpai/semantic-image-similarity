from os import listdir
from os.path import isfile, join
import os
import shutil

def make_folder(path):
    try:
        os.makedirs(path)
    except:
        pass

def get_text_in_file(path):

    image_names = []

    gt_files_path = path+'/gt_files'
    images_path = path+'/images'

    gt_files = [f for f in listdir(gt_files_path) if isfile(join(gt_files_path, f))]
    images = [f for f in listdir(images_path) if isfile(join(images_path, f))]

    for file in gt_files:
        if (file.endswith("junk.txt")): continue

        with open(gt_files_path+'/'+file, 'r') as f:
            text = f.read()
            lines = text.split('\n')

            for line in lines:
                image_names.append(line)

    for name in image_names:
        make_folder('./deep-learning/data/dataset/' + name[0:name.__len__()-7])

    for file in images:
        for image_name in image_names:
            if (file[0:file.__len__()-4] == image_name):
                shutil.copyfile(images_path+'/'+file, './deep-learning/data/dataset/' + image_name[0:image_name.__len__()-7] +'/' + file)

if __name__ == '__main__':
    get_text_in_file(r'C:\Documents\Git\semantic-image-similarity\deep-learning\data\the_oxford_buildings_dataset')
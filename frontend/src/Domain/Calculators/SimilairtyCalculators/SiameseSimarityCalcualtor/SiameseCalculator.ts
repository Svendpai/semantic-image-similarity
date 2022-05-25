import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';

import { fetch, decodeJpeg, bundleResourceIO, cameraWithTensors } from '@tensorflow/tfjs-react-native';

import { manipulateAsync } from 'expo-image-manipulator';
import { Image } from 'react-native';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-react-native';
import { IImageSimilarityCalculator } from '../../../Interfaces/IImageSimilarityCalculator';
import { SimilarityResponse } from '../../../Types/CalculationResponseObjects';

async function decodeImage(img: any): Promise<tf.Tensor3D> {

    console.log(img.uri);  
    const fileUri = img.uri;
    const imgB64 = await FileSystem.readAsStringAsync(fileUri, {encoding: FileSystem.EncodingType.Base64});
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer)  
    const imageTensor = decodeJpeg(raw);

    console.log("imageTensor", imageTensor);
    // imageTensor.reshape([224, 224, 3]);
    // console.log("imageTensor", imageTensor);
    // imageTensor = imageTensor.div(tf.scalar(255));
    // // subtract the mean RGB value.
    // const meanR = 0.485;
    // const meanG = 0.456;
    // const meanB = 0.406;
    // const meanRGB = tf.tensor3d([meanR, meanG, meanB], [1, 1, 3]);
    // imageTensor = imageTensor.sub(meanRGB);
    // imageTensor = tf.expandDims(imageTensor, 0);
    return imageTensor;
}

async function loadModel() {
    await tf.setBackend('rn-webgl');

    await tf.ready();

    const modelJSON = require('./mymodel/model.json');
    const modelWeights = require('./mymodel/group1-shard1of1.bin');
    const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights));
    model.summary();
    return model;
}

class SiameseSimilarityCalculator implements IImageSimilarityCalculator {
    model?: tf.LayersModel;
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateSimilarity: (image: string, image2: string) => Promise<SimilarityResponse>;

    constructor() {
        this.acceptedMeasureThresholds = { good: 0.6, okay: 0.3 };
        this.acceptResponseTimeThresholds = { good: 0.5, okay: 0.3 };

        this.isCalculatorReady = () => {
            return !!this.model;
        };

        this.calculateSimilarity = async (image1: string, image2: string) => {
            const timeStart = new Date().getTime();

            const resizedImage1 = await manipulateAsync(image1, [{ resize: { width: 160, height: 160 } }]);
            const resizedImage2 = await manipulateAsync(image2, [{ resize: { width: 160, height: 160 } }]);
            if (this.model) {
                console.log("ehh");
                let offset = tf.scalar(127.5);
                const prediction: any = this.model.predict([
                    (await decodeImage(resizedImage1)).sub(offset).div(offset).expandDims(),
                    (await decodeImage(resizedImage2)).sub(offset).div(offset).expandDims(),
                ]);

                const image1Features = prediction[0]; //(prediction as Tensor).arraySync();
                const image2Features = prediction[1]; //(prediction as Tensor).arraySync();'

                console.log('3');
                // calculate euclidean distance
                const distance = tf.sqrt(tf.sum(tf.squaredDifference(image1Features, image2Features)));

                const timeEnd = new Date().getTime();

                return {
                    responseTime: timeEnd - timeStart,
                    similarity: distance.dataSync()[0],
                };
            } else {
                return { responseTime: 1, similarity: 1 };
            }
        };
        this.loadCalculator = async () => {
            try {
                this.model = await loadModel();
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        };
    }
}
export default SiameseSimilarityCalculator;

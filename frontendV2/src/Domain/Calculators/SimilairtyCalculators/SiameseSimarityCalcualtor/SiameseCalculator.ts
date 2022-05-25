import * as tf from '@tensorflow/tfjs';

import { decodeJpeg, bundleResourceIO, cameraWithTensors } from '@tensorflow/tfjs-react-native';

import { manipulateAsync } from 'expo-image-manipulator';

import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-react-native';
import { IImageSimilarityCalculator } from '../../../Interfaces/IImageSimilarityCalculator';
import { SimilarityResponse } from '../../../Types/CalculationResponseObjects';
async function decodeImage(img: any): Promise<tf.Tensor3D> {
    //const imageAssetPath = Image.resolveAssetSource(img.uri);

    console.log('d1');
    const response: Response = await tf.util.fetch(img.uri);
    console.log('d2');
    const imageDataArrayBuffer = await response.arrayBuffer();
    console.log('d2');
    const imageData = new Uint8Array(imageDataArrayBuffer);
    const res = decodeJpeg(imageData);
    console.log('d3');
    return res;
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
            console.log('1');
            if (this.model) {
                let offset = tf.scalar(127.5);
                console.log('2');
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

import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';

import { decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

import { manipulateAsync } from 'expo-image-manipulator';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-react-native';
import { IImageSimilarityCalculator } from '../../../Interfaces/IImageSimilarityCalculator';
import { SimilarityResponse } from '../../../Types/CalculationResponseObjects';
import { Platform } from 'react-native';

async function decodeImage(img: any): Promise<tf.Tensor3D> {
    const fileUri = img.uri;
    const imgB64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);
    return imageTensor;
}

async function calculateLightLevel(img: any) {
    const fileUri = img.uri;
    const imgB64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);
    const values = imageTensor.dataSync();

    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    // negative values means that the documentation image is brighter than the instruction image
    // positive values means that the documentation image is darker than the instruction image
    // maybe set at threshold of 0.2 difference to be a warning sign
    return sum / (values.length * 255);
}

async function preprocessImage(imageTensor: tf.Tensor3D) {
    imageTensor = imageTensor.div(tf.scalar(255));
    // // subtract mean
    // const meanR = 0.485;
    // const meanG = 0.456;
    // const meanB = 0.406;
    // const meanRGB = tf.tensor3d([meanR, meanG, meanB], [1, 1, 3]);
    // imageTensor = imageTensor.sub(meanRGB);
    imageTensor = tf.expandDims(imageTensor, 0);
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

function calculateCosineSimimilarity(A: any, B: any) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (let i = 0; i < A.length; i++) {
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / (mA * mB);
    return similarity;
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
            image1 = require('./n0425468000000140.jpg');
            image2 = require('./n0425468000000253.jpg');
            const image3 = require('./n0451500300000143.jpg');

            if (this.model) {
                const timeStart = new Date().getTime();

                const resizedImage1 = await manipulateAsync(image1, [{ resize: { width: 224, height: 224 } }]);
                const resizedImage2 = await manipulateAsync(image2, [{ resize: { width: 224, height: 224 } }]);

                const resizedImage1_pre = await preprocessImage(await decodeImage(resizedImage1));
                const resizedImage2_pre = await preprocessImage(await decodeImage(resizedImage2));

                const image1Features = this.model.predict(resizedImage1_pre) as tf.Tensor;
                const image2Features = this.model.predict(resizedImage2_pre) as tf.Tensor;

                const image1LightLevel = await calculateLightLevel(resizedImage1);
                const image2LightLevel = await calculateLightLevel(resizedImage2);

                let similarity = calculateCosineSimimilarity(image1Features.dataSync(), image2Features.dataSync());
                if (Platform.OS === 'android') {
                    similarity = (similarity - 0.5) * 2;
                }

                const timeEnd = new Date().getTime();

                console.log('image1LightLevel: ' + image1LightLevel);
                console.log('image2LightLevel: ' + image2LightLevel);
                console.log('Light difference: ' + (image1LightLevel - image2LightLevel));

                return {
                    responseTime: timeEnd - timeStart,
                    similarity: similarity,
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

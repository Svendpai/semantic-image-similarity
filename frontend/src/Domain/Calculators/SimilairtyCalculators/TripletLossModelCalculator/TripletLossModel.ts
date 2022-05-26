import * as tf from '@tensorflow/tfjs';
import {
    decodeImage,
    calculateLightLevel,
    preprocessImage,
    calculateCosineSimimilarity,
} from '../../../../Utils/SimilarityCalculatorUtils';

import { manipulateAsync } from 'expo-image-manipulator';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-react-native';
import { IImageSimilarityCalculator } from '../../../Interfaces/IImageSimilarityCalculator';
import { SimilarityResponse } from '../../../Types/CalculationResponseObjects';
import { Platform } from 'react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

async function loadModel() {
    await tf.setBackend('rn-webgl');

    await tf.ready();

    const modelJSON = require('./Model/model.json');
    const modelWeights = require('./Model/group1-shard1of1.bin');
    const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights));
    model.summary();
    return model;
}

class TripletLossModel implements IImageSimilarityCalculator {
    model?: tf.LayersModel;
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateSimilarity: (image: string, image2: string) => Promise<SimilarityResponse>;

    constructor() {
        this.acceptedMeasureThresholds = { good: 0.75, okay: 0.5 };
        this.acceptResponseTimeThresholds = { good: 100, okay: 300 };

        this.isCalculatorReady = () => {
            return !!this.model;
        };

        this.calculateSimilarity = async (image1: string, image2: string) => {
            if (this.model) {
                const timeStart = new Date().getTime();

                const resizedImage1 = await manipulateAsync(image1, [{ resize: { width: 224, height: 224 } }]);
                const resizedImage2 = await manipulateAsync(image2, [{ resize: { width: 224, height: 224 } }]);

                const decodedImage1 = await decodeImage(resizedImage1);
                const decodedImage2 = await decodeImage(resizedImage2);

                const resizedImage1_pre = await preprocessImage(decodedImage1);
                const resizedImage2_pre = await preprocessImage(decodedImage2);

                const image1Features = this.model.predict(resizedImage1_pre) as tf.Tensor;
                const image2Features = this.model.predict(resizedImage2_pre) as tf.Tensor;

                let similarity = calculateCosineSimimilarity(image1Features.dataSync(), image2Features.dataSync());

                // There is a bug in android, where the image compression is wrong leading to a wrong similarity value
                if (Platform.OS === 'android') {
                    similarity = (similarity - 0.5) * 2;
                }
                similarity = (similarity - 0.7) * 1/0.7;

                const timeEnd = new Date().getTime();

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
export default TripletLossModel;

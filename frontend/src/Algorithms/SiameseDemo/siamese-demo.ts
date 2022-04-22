import {
    SimilarityAlgorithm,
    SimilarityResponse,
} from '../similiarty-algorithms';

import * as tf from '@tensorflow/tfjs';
import { Tensor, NumericDataType } from '@tensorflow/tfjs-core';
import {
    fetch,
    decodeJpeg,
    bundleResourceIO,
    cameraWithTensors,
} from '@tensorflow/tfjs-react-native';
import { View, Text, Image } from 'react-native';

async function decodeImage(img: any): Promise<tf.Tensor3D> {
    const imageAssetPath = Image.resolveAssetSource(img);
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);
    return decodeJpeg(imageData);
}

async function loadModel() {
    await tf.ready();

    const modelJSON = require('./model.json');
    const modelWeights = require('./group1-shard1of1.bin');
    const model = await tf.loadLayersModel(
        bundleResourceIO(modelJSON, modelWeights)
    );
    model.summary();
}

const SiameseDemoAlgorithm: SimilarityAlgorithm = {
    algorithmData: {
        isCalculating: false,
        latestSimilarityResponse: null,
        displayName: 'Siamese Algorithm',
        modelLoaded: false,
        model: null,
    },
    calculateSimilarity: async (image1: any, image2: any) => {
        const model: tf.LayersModel | undefined =
            SiameseDemoAlgorithm.algorithmData.model;
        if (model) {
            SiameseDemoAlgorithm.algorithmData.isCalculating = true;
            const prediction = model.predict([
                (await decodeImage(image1)).expandDims(),
                (await decodeImage(image2)).expandDims(),
            ]);

            console.log('PREDICTION:');
            const realPrediction = (prediction as Tensor).dataSync();
            console.log(realPrediction.indexOf(Math.max(...realPrediction)));
            SiameseDemoAlgorithm.algorithmData.isCalculating = false;
            return { responseTimeInMillis: 1000, similarity: 1 }; //realPrediction;
        } else {
            throw new Error('Model not loaded');
        }
    },
    loadModel: async () => {
        const model = await loadModel();
        SiameseDemoAlgorithm.algorithmData.model = model;
        return true;
    },
};

export default SiameseDemoAlgorithm;

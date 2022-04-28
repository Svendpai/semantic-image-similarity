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
import { manipulateAsync, ActionResize } from 'expo-image-manipulator';

async function decodeImage(img: any): Promise<tf.Tensor3D> {
    console.log(img);
    //const imageAssetPath = Image.resolveAssetSource(img.uri);

    const response = await fetch(img.uri, {}, { isBinary: true });
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
    return model;
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

        const resizedImage1 = await manipulateAsync(image1, [
            { resize: { width: 160, height: 160 } },
        ]);
        const resizedImage2 = await manipulateAsync(image2, [
            { resize: { width: 160, height: 160 } },
        ]);
        if (model) {
            SiameseDemoAlgorithm.algorithmData.isCalculating = true;
            console.log('trying to predict');
            const prediction: any = model.predict([
                (await decodeImage(resizedImage1)).expandDims(),
                (await decodeImage(resizedImage2)).expandDims(),
            ]);

            console.log('PREDICTION:');
            const image1Features = prediction[0]; //(prediction as Tensor).arraySync();
            const image2Features = prediction[1]; //(prediction as Tensor).arraySync();'

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

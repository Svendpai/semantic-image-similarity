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
} from '@tensorflow/tfjs-react-native';
import { View, Text, Image } from 'react-native';
import { manipulateAsync, ActionResize } from 'expo-image-manipulator';
import { mode } from 'native-base/lib/typescript/theme/tools';

async function decodeImage(img: any): Promise<tf.Tensor3D> {
    console.log(img);
    //const imageAssetPath = Image.resolveAssetSource(img.uri);

    const response = await fetch(img.uri, {}, { isBinary: true });
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);
    return decodeJpeg(imageData);
}

async function loadModel() {
    console.log('trying to get ready');
    await tf.ready();
    //App break here ^^ when tf.ready is called
    console.log('tf ready');
    /*
    const modelJSON = require('./model.json');
    const modelWeights = require('./group1-shard1of1.bin');

    console.log('loaded shards and json model');
    const model = await tf.loadLayersModel(
        bundleResourceIO(modelJSON, modelWeights)
    );

    console.log('instatitaed layers model');
    model.summary();
    return model;*/
    return {};
}

const SiameseDemoAlgorithm: SimilarityAlgorithm = {
    algorithmData: {
        isCalculating: false,
        latestSimilarityResponse: null,
        displayName: 'Siamese Algorithm',
        modelLoaded: false,
        model: null,
    },
    calculateSimilarity: async (image1: any, image2: any, model: any) => {
        const timeStart = new Date().getTime();

        const resizedImage1 = await manipulateAsync(image1, [
            { resize: { width: 160, height: 160 } },
        ]);
        const resizedImage2 = await manipulateAsync(image2, [
            { resize: { width: 160, height: 160 } },
        ]);
        if (model) {
            console.log('trying to predict');
            let offset = tf.scalar(127.5);
            const prediction: any = model.predict([
                (await decodeImage(resizedImage1))
                    .sub(offset)
                    .div(offset)
                    .expandDims(),
                (await decodeImage(resizedImage2))
                    .sub(offset)
                    .div(offset)
                    .expandDims(),
            ]);

            console.log('PREDICTION:');
            const image1Features = prediction[0]; //(prediction as Tensor).arraySync();
            const image2Features = prediction[1]; //(prediction as Tensor).arraySync();'

            console.log(image1Features.shape);
            console.log(image2Features);

            // calculate euclidean distance

            const distance = tf.sqrt(
                tf.sum(tf.squaredDifference(image1Features, image2Features))
            );
            console.log(distance.dataSync());
            const timeEnd = new Date().getTime();

            return {
                responseTimeInMillis: timeEnd - timeStart,
                similarity: distance.dataSync()[0],
            };
        } else {
            console.log('model not loaded');
            return { responseTimeInMillis: 0, similarity: 0 };
        }
    },
    loadModel: async () => {
        const model = await loadModel();
        return model;
    },
};

export default SiameseDemoAlgorithm;

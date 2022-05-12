import {
    SimilarityAlgorithm,
    SimilarityResponse,
} from '../similiarty-algorithms';

import * as tf from '@tensorflow/tfjs';
import { Tensor, NumericDataType } from '@tensorflow/tfjs-core';
import {
    decodeJpeg,
    bundleResourceIO,
    cameraWithTensors,
} from '@tensorflow/tfjs-react-native';
import { View, Text, Image } from 'react-native';
import { manipulateAsync, ActionResize } from 'expo-image-manipulator';
import { mode } from 'native-base/lib/typescript/theme/tools';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-react-native';

const uriToBlob = async (uri: string) => {
    const blobToBase64 = (blob: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    // Fetch audio binary blob data
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    return await blobToBase64(blob as Blob);
};

async function decodeImage(img: any): Promise<tf.Tensor3D> {
    console.log(img);
    //const imageAssetPath = Image.resolveAssetSource(img.uri);
    console.log('maybe sir');
    const response: Response = await tf.util.fetch(img.uri);
    console.log('yes sir');
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);
    return decodeJpeg(imageData);
}

async function loadModel() {
    await tf.setBackend('rn-webgl');
    tf.registerBackend;
    console.log(tf.getBackend());
    await tf.ready();
    //this breaks the app on iphone
    //tf.setBackend('rn-webgl');

    const modelJSON = require('./mymodel/model.json');
    const modelWeights = require('./mymodel/group1-shard1of1.bin');
    const model = await tf.loadLayersModel(
        //'file://mymodel'
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
            console.log('trying t rpedict');
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

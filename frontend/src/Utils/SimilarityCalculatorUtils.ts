import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

const MEAN_IMAGENET_RED = 0.485;
const MEAN_IMAGENET_GREEN = 0.456;
const MEAN_IMAGENET_BLUE = 0.406;

const STD_IMAGENET_RED = 0.229;
const STD_IMAGENET_GREEN = 0.224;
const STD_IMAGENET_BLUE = 0.225;

async function decodeImage(img: any): Promise<tf.Tensor3D> {
    const fileUri = img.uri;
    const imgB64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw);
    return imageTensor;
}

function subtractMean(imageTensor: tf.Tensor3D) {
    const meanRGB = tf.tensor3d([MEAN_IMAGENET_RED, MEAN_IMAGENET_GREEN, MEAN_IMAGENET_BLUE], [1, 1, 3]);
    imageTensor = imageTensor.sub(meanRGB);
    return imageTensor;
}

function divideStandardDeviation(imageTensor: tf.Tensor3D) {
    const stdRGB = tf.tensor3d([STD_IMAGENET_RED, STD_IMAGENET_GREEN, STD_IMAGENET_BLUE], [1, 1, 3]);
    imageTensor = imageTensor.div(stdRGB);
    return imageTensor;
}

async function preprocessImage(imageTensor: tf.Tensor3D) {
    imageTensor = imageTensor.div(tf.scalar(255));
    imageTensor = subtractMean(imageTensor);
    imageTensor = divideStandardDeviation(imageTensor);
    imageTensor = tf.expandDims(imageTensor, 0);
    return imageTensor;
}

// negative values means that the documentation image is brighter than the instruction image
// positive values means that the documentation image is darker than the instruction image
// maybe set at threshold of 0.2 difference to be a warning sign
async function calculateLightLevel(imageTensor: tf.Tensor3D) {
    const values = imageTensor.dataSync();

    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return sum / (values.length * 255);
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

export { decodeImage, calculateLightLevel, preprocessImage, calculateCosineSimimilarity };

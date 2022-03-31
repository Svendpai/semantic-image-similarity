import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image } from "react-native";
import { Camera } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import { Tensor, NumericDataType } from "@tensorflow/tfjs-core";
import { fetch, decodeJpeg, bundleResourceIO, cameraWithTensors } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MobileNet } from "@tensorflow-models/mobilenet";
import { CameraType } from 'expo-camera/build/Camera.types';
import { ExpoWebGLRenderingContext } from 'expo-gl';

const TensorCamera = cameraWithTensors(Camera);

const AUTO_RENDER = false;

const Simtest = () => {
  const cameraRef = useRef(null);
  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState("");
  const [time, setTime] = useState<number>();

  const [model, setModel] = useState<MobileNet>();
  const [tfmodel, setTFModel] = useState<tf.LayersModel>();

  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );

  const rafId = useRef<number | null>(null);

  const img = require("./apple2.jpg");

  async function decodeImage(img: any): Promise<tf.Tensor3D> {

    const imageAssetPath = Image.resolveAssetSource(img);
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);
    return decodeJpeg(imageData)
  }

  async function loadModel() {
    await tf.ready()
    setIsTfReady(true);

    const modelJSON = require('./assets/model/model.json');
    const modelWeights = require('./assets/model/group1-shard1of1.bin');
    const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights));
    model.summary();
    setTFModel(model);

    const prediction = model.predict((await decodeImage(img)).expandDims());
    console.log("PREDICTION:");
    const realPrediction = (prediction as Tensor).dataSync();
    console.log(realPrediction.indexOf(Math.max(...realPrediction)));

    // if (prediction && prediction > 0) {
    //   setResult(
    //     `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`
    //   );
    // }

  }

  const load = async () => {
    try {
      // Load mobilenet.
      await tf.ready();
      let newModel = model;
      if (!newModel) {
        newModel = await mobilenet.load()
        setModel(newModel);
      }
      setIsTfReady(true);
      // Start inference and show result.
      if (!newModel) {
        console.log("asdasd");
        throw new Error("Model not loaded");
      }

      const startTime = new Date().getTime();
      const imageTensor = await decodeImage(img);
      const prediction = await newModel.classify(imageTensor);
      const imageTensor1 = await decodeImage(img);
      const prediction2 = await newModel.classify(imageTensor1);
      const imageTensor2 = await decodeImage(img);
      // const prediction3 = await model.classify(imageTensor2);
      // const imageTensor3 = await decodeImage(img);
      // const prediction4 = await model.classify(imageTensor3);
      // const imageTensor4 = await decodeImage(img);
      // const prediction5 = await model.classify(imageTensor4);
      // const imageTensor5 = await decodeImage(img);
      // const prediction6 = await model.classify(imageTensor5);
      // const imageTensor6 = await decodeImage(img);
      // const prediction7 = await model.classify(imageTensor6);
      // const imageTensor7 = await decodeImage(img);
      // const prediction8 = await model.classify(imageTensor7);
      // const imageTensor8 = await decodeImage(img);
      const endTime = new Date().getTime();
      setTime(endTime - startTime);
      if (prediction && prediction.length > 0) {
        setResult(
          `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`
        );
      }
    } catch (err) {
      load();
      console.log(err);
    }
  };

  const handleCameraStream = async (
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void,
    gl: ExpoWebGLRenderingContext) => {

      let count = 0;
    const loop = async () => {

      // Get the tensor and run pose detection.
      //const imageTensor = images.next().value as tf.Tensor3D;

      const startTs = Date.now();
      // const poses = await model!.estimatePoses(
      //   imageTensor,
      //   undefined,
      //   Date.now()
      // );
      const latency = Date.now() - startTs;
  
      console.log(count)
      // setFps(Math.floor(1000 / latency));
      // setPoses(poses);
      //tf.dispose([imageTensor]);

      if (rafId.current === 0) {
        return;
      }
      

      // Render camera preview manually when autorender=false.
      if (!AUTO_RENDER) {
        updatePreview();
        gl.endFrameEXP();
      }

      //rafId.current = requestAnimationFrame(loop);
      setTimeout(()=>{
        loop();
        count++;
      },1000)
    };
    loop();
    

  }


  useEffect(() => {

    rafId.current = null;

    //loadModel();

    // load();
  }, []);

  useEffect(() => {
    // Called when the app is unmounted.
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  function rating(percentage: number) {
    if (percentage < 0.5) {
      return "bad";
    } else if (percentage < 0.7) {
      return "ok";
    } else if (percentage < 0.9) {
      return "good";
    } else {
      return "excellent";
    }
  }

  return (
    <View style={{ height: 300, width: '100%', backgroundColor: 'white' }}>
      <TensorCamera
        ref={cameraRef}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
        }
        }
        autorender={AUTO_RENDER}
        type={cameraType}
        // tensor related props
        resizeWidth={32}
        resizeHeight={32}
        resizeDepth={3}
        useCustomShadersToResize={false}
        onReady={handleCameraStream}
        cameraTextureWidth={0}
        cameraTextureHeight={0} />
      {!isTfReady && <Text>Loading TFJS model...</Text>}
      {isTfReady && result === "" && <Text>Classifying...</Text>}
      <Text>Class: {result.substring(0, result.indexOf("("))}</Text>
      <Text>
        Score: {+result.substring(result.indexOf("(") + 1, result.length - 1)}
      </Text>
      <Text style={{ fontWeight: "bold" }}>
        {+result.substring(result.indexOf("(") + 1, result.length - 1) >
          0.5 && (
            <Text>
              {rating(
                +result.substring(result.indexOf("(") + 1, result.length - 1)
              )}
            </Text>
          )}
      </Text>
      {<Text>Time: {time ? time : "not measured yet"}</Text>}
    </View>
  );
};


export default Simtest;
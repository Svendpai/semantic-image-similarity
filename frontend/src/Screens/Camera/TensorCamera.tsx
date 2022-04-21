import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { View } from 'native-base';
import { Platform } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    cameraRef: Camera | any;
    width: number;
    height: number;
    type: any;
    flashMode: any;
};

const Component: React.FC<Props> = ({
    cameraRef,
    width,
    height,
    type,
    flashMode,
}) => {
    const [tfReady, setTfReady] = useState<boolean>(false);

    useEffect(() => {
        const bob = async () => {
            tf.ready().then(() => {
                setTfReady(true);
            });
            const { status } = await Camera.requestCameraPermissionsAsync();
        };
        bob();
    });

    const handleCameraStream = (
        images: IterableIterator<tf.Tensor3D>,
        updatePreview: () => void,
        gl: ExpoWebGLRenderingContext
    ) => {
        const loop = async () => {
            const nextImageTensor = images.next().value;
            //console.log(nextImageTensor);
            //
            // do something with tensor here
            //

            // if autorender is false you need the following two lines.
            //updatePreview();
            //gl.endFrameEXP();

            requestAnimationFrame(loop);
        };

        loop();
    };

    let textureDims;
    if (Platform.OS === 'ios') {
        textureDims = {
            height: 1920,
            width: 1080,
        };
    } else {
        textureDims = {
            height: 1200,
            width: 1600,
        };
    }
    const TensorCamera = cameraWithTensors(Camera);

    return (
        //await tf.ready();
        // Currently expo does not support automatically determining the
        // resolution of the camera texture used. So it must be determined
        // empirically for the supported devices and preview size.

        <>
            {tfReady && Platform.OS !== 'android' && (
                <View>
                    <TensorCamera
                        // Standard Camera props
                        ratio='4:3'
                        ref={(ref) => {
                            cameraRef = ref;
                        }}
                        style={{
                            aspectRatio: 1 / (4 / 3),
                            width: width,
                            height: height,
                            // aspectRatio: 1 / (4 / 3),
                            // width: getWidth(),
                            // height: getWidth() * 1.333
                            // opacity:
                            //     mode == 'instruction' &&
                            //     count.documentationImageUri
                            //         ? 0.7
                            //         : 1,
                        }}
                        type={type}
                        flashMode={flashMode}
                        // Tensor related props
                        cameraTextureHeight={textureDims.width}
                        cameraTextureWidth={textureDims.height}
                        useCustomShadersToResize={false}
                        resizeHeight={200}
                        resizeWidth={152}
                        resizeDepth={3}
                        onReady={handleCameraStream}
                        autorender={true}
                    />
                </View>
            )}
        </>
    );
};
export default Component;

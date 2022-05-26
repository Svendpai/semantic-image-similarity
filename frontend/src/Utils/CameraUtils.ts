import { Camera, CameraCapturedPicture } from 'expo-camera';
import React from 'react';

const takePicture = async (cameraRef: React.RefObject<Camera>): Promise<string> => {
    const picture: CameraCapturedPicture | undefined = await cameraRef.current?.takePictureAsync();
    if (!picture) {
        throw Error('no picture. Could not navigate');
    }
    return picture.uri;
};

export default { takePicture };

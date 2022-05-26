import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';

const takePicture = async (cameraRef: React.RefObject<Camera>): Promise<string> => {
    const picture: CameraCapturedPicture | undefined = await cameraRef.current?.takePictureAsync();
    if (!picture) {
        throw Error('no picture. Could not navigate');
    }
    return picture.uri;
};

const openGallery = async (galleryPermission: boolean): Promise<string | undefined> => {
    if (!galleryPermission) {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [3, 4],
        quality: 1,
    });
    if (pickerResult.cancelled) {
        return undefined;
    }
    return pickerResult.uri;
};

export default { takePicture, openGallery };

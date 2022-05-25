import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import CameraFooterControllerView from './CameraFooterControllerView';
import * as ImagePicker from 'expo-image-picker';
import { setGalleryOpen, setSelectedCameraType } from '../../../Redux/Slices/cameraSlice';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { setDocumentationImage, setInstructionImage } from '../../../Redux/Slices/cameraSlice';

const CameraFooterController: React.FC<{
    cameraRef: React.RefObject<Camera>;
    cameraMode: 'instruction' | 'documentation';
}> = ({ cameraRef, cameraMode }) => {
    const availableCameraTypes = useSelector((state: RootState) => state.camera.availableCameraTypes);
    const galleryPermission = useSelector((state: RootState) => state.camera.galleryPermission);
    const selectedCameraType = useSelector((state: RootState) => state.camera.selectedCameraType);

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const next = () => {
        if (cameraMode === 'instruction') {
            navigation.navigate('Home');
        } else {
            navigation.navigate('Editimage');
        }
    };

    const openGallery = async () => {
        if (!galleryPermission) {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }
        }
        dispatch(setGalleryOpen(true));
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        dispatch(setGalleryOpen(false));
        if (!pickerResult.cancelled) {
            if (cameraMode === 'documentation') {
                dispatch(setDocumentationImage(pickerResult.uri));
            } else {
                dispatch(setInstructionImage(pickerResult.uri));
            }
        }
    };

    const flipCamera = () => {
        dispatch(
            setSelectedCameraType(
                availableCameraTypes[
                    (availableCameraTypes.indexOf(selectedCameraType) + 1) % availableCameraTypes.length
                ]
            )
        );
    };

    const takePicture = async () => {
        const picture: CameraCapturedPicture | undefined = await cameraRef.current?.takePictureAsync();
        if (!picture) {
            throw Error('no picture found. Could not navigate');
        }

        if (cameraMode === 'documentation') {
            dispatch(setDocumentationImage(picture.uri));
        } else {
            dispatch(setInstructionImage(picture.uri));
        }
        next();
    };

    return (
        <CameraFooterControllerView
            cameraFlipAvailable={availableCameraTypes.length > 1}
            openGallery={openGallery}
            flipCamera={flipCamera}
            takePicture={takePicture}
            cameraMode={cameraMode}
        />
    );
};

export default CameraFooterController;

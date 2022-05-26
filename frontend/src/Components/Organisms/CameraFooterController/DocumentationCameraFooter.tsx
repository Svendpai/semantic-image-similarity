import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import CameraFooterView from './CameraFooterControllerView';
import * as ImagePicker from 'expo-image-picker';
import { setGalleryOpen, setSelectedCameraType } from '../../../Redux/Slices/cameraSlice';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { setDocumentationImage, setInstructionImage } from '../../../Redux/Slices/cameraSlice';
import CameraUtils from '../../../Utils/CameraUtils';
import CameraFooterController from './CameraFooterController';

const DocumentationCameraFooter: React.FC<{
    cameraRef: React.RefObject<Camera>;
    cameraMode: 'instruction' | 'documentation';
}> = ({ cameraRef, cameraMode }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const galleryPermission = useSelector((state: RootState) => state.camera.galleryPermission);

    const takePicture = async () => {
        const imageUri = await CameraUtils.takePicture(cameraRef);
        //documentation camera unique behavior
        dispatch(setDocumentationImage(imageUri));
        navigation.navigate('Editimage');
    };

    const openGallery = async () => {
        dispatch(setGalleryOpen(true));
        const imageUri = await CameraUtils.openGallery(galleryPermission);

        dispatch(setGalleryOpen(false));
        if (!imageUri) {
            //
            return;
        }
        navigation.navigate('Editimage');
        dispatch(setDocumentationImage(imageUri));
    };

    return <CameraFooterController takePicture={takePicture} openGallery={openGallery} cameraMode={cameraMode} />;
};

export default DocumentationCameraFooter;

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

const CameraFooterController: React.FC<{
    takePicture: () => void;
    cameraMode: 'instruction' | 'documentation';
    openGallery: () => void;
}> = ({ takePicture, cameraMode, openGallery }) => {
    const availableCameraTypes = useSelector((state: RootState) => state.camera.availableCameraTypes);
    const selectedCameraType = useSelector((state: RootState) => state.camera.selectedCameraType);

    const dispatch = useDispatch();

    const flipCamera = () => {
        dispatch(
            setSelectedCameraType(
                availableCameraTypes[
                    (availableCameraTypes.indexOf(selectedCameraType) + 1) % availableCameraTypes.length
                ]
            )
        );
    };

    return (
        <CameraFooterView
            cameraFlipAvailable={availableCameraTypes.length > 1}
            openGallery={openGallery}
            flipCamera={flipCamera}
            takePicture={takePicture}
            cameraMode={cameraMode}
        />
    );
};

export default CameraFooterController;

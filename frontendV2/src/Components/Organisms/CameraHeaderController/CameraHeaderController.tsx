import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashMode } from 'expo-camera';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { setSelectedFlashMode, toggleRealTimeProcessing } from '../../../Redux/Slices/cameraSlice';
import { RootState } from '../../../Redux/store';
import ContainerCenteringContent from '../../Atoms/ContainerCenteringContent';
import ModalCentered, { ModalHandle } from '../../Atoms/ModalCentered';
import CameraHeaderControllerView from './CameraHeaderControllerView';

const CameraHeaderController: React.FC<{ modalRef: React.RefObject<ModalHandle> }> = ({ modalRef }) => {
    const selectedFlashMode = useSelector((state: RootState) => state.camera.flashMode);
    const realTimeUpdatesAvailable = useSelector((state: RootState) => state.camera.realTimeProcessingAvailable);
    const realTimeProcessingToggled = useSelector((state: RootState) => state.camera.realTimeProcessingToggled);
    const availableFlashModes = useSelector((state: RootState) => state.camera.availabelFlashModes);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const toggleFlash = () => {
        dispatch(setSelectedFlashMode(selectedFlashMode === FlashMode.off ? FlashMode.torch : FlashMode.off));
    };

    const toggleRealTimeUpdates = () => {
        dispatch(toggleRealTimeProcessing());
    };
    const goBack = () => {
        navigation.navigate('Home');
    };

    return (
        <CameraHeaderControllerView
            flashActivated={selectedFlashMode !== FlashMode.off}
            toggleFlash={toggleFlash}
            realTimeUpdatesActivated={realTimeProcessingToggled}
            toggleRealTimeUpdates={toggleRealTimeUpdates}
            // flash mode will always have the available value of "off"
            flashAvailable={availableFlashModes.length > 1}
            realTimeUpdatesAvailable={realTimeUpdatesAvailable}
            goBack={goBack}
        />
    );
};

export default CameraHeaderController;

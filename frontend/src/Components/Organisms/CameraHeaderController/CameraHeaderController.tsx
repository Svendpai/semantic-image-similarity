import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashMode } from 'expo-camera';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { setSelectedFlashMode, toggleOverlay, toggleRealTimeProcessing } from '../../../Redux/Slices/cameraSlice';
import { RootState } from '../../../Redux/store';
import ContainerCenteringContent from '../../Atoms/ContainerCenteringContent';
import ModalCentered, { ModalHandle } from '../../Atoms/ModalCentered';
import CameraHeaderControllerView from './CameraHeaderControllerView';

const CameraHeaderController: React.FC<{
    modalRef: React.RefObject<ModalHandle>;
    overlayFunctionalityEnabled: boolean;
}> = ({ modalRef, overlayFunctionalityEnabled }) => {
    const selectedFlashMode = useSelector((state: RootState) => state.camera.flashMode);
    const realTimeUpdatesAvailable = useSelector((state: RootState) => state.camera.realTimeProcessingAvailable);
    const realTimeProcessingToggled = useSelector((state: RootState) => state.camera.realTimeProcessingToggled);
    const availableFlashModes = useSelector((state: RootState) => state.camera.availabelFlashModes);
    const overlayActivated = useSelector((state: RootState) => state.camera.overlayActivated);

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
    const _toggleOverlay = () => {
        dispatch(toggleOverlay());
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
            overlayActivated={overlayActivated}
            overlayEnabled={overlayFunctionalityEnabled}
            toggleOverlay={_toggleOverlay}
        />
    );
};

export default CameraHeaderController;

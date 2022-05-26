import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import CameraContainerView from './CameraContainerView';
import { setCameraPermission, setCameraReady } from '../../../Redux/Slices/cameraSlice';
import { Camera } from 'expo-camera';
import ImageOverlay from '../../Molecules/ImageOverlay';

const CameraContainer: React.FC<{ cameraRef: React.RefObject<Camera> | null; overlayEnabled: boolean }> = ({
    cameraRef,
    overlayEnabled,
}) => {
    const cameraType = useSelector((state: RootState) => state.camera.selectedCameraType);
    const flashMode = useSelector((state: RootState) => state.camera.flashMode);
    const cameraPermissions = useSelector((state: RootState) => state.camera.cameraPermission);
    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);
    const overlayActivated = useSelector((state: RootState) => state.camera.overlayActivated);

    const dispatch = useDispatch();

    const _setCameraReady = () => {
        dispatch(setCameraReady(true));
    };

    useEffect(() => {
        getCameraPermissions();
        return () => {
            dispatch(setCameraReady(false));
        };
    }, []);

    const getCameraPermissions = async () => {
        if (!cameraPermissions) {
            const { status } = await Camera.requestCameraPermissionsAsync();
            dispatch(setCameraPermission(status === 'granted'));
        }
    };

    return (
        <>
            {cameraPermissions && (
                <CameraContainerView
                    flashMode={flashMode}
                    setCameraReady={_setCameraReady}
                    type={cameraType}
                    cameraRef={cameraRef}
                    overlayImageUri={instructionImage}
                    overlayActivated={overlayActivated && overlayEnabled}
                    overlayImageOpacity={0.5}
                />
            )}
        </>
    );
};

export default CameraContainer;

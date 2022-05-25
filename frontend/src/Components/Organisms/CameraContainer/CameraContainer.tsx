import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import CameraContainerView from './CameraContainerView';
import { setCameraPermission, setCameraReady } from '../../../Redux/Slices/cameraSlice';
import { Camera } from 'expo-camera';

const CameraContainer: React.FC<{ cameraRef: React.RefObject<Camera> | null }> = ({ cameraRef }) => {
    const cameraType = useSelector((state: RootState) => state.camera.selectedCameraType);
    const flashMode = useSelector((state: RootState) => state.camera.flashMode);
    const cameraPermissions = useSelector((state: RootState) => state.camera.cameraPermission);

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
                />
            )}
        </>
    );
};

export default CameraContainer;

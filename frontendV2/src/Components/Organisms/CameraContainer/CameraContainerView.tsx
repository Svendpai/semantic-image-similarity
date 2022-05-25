import { Box, IBoxProps } from 'native-base';
import { useRef, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { colors } from '../../Atoms/Colors';

interface Props {
    flashMode: number | FlashMode | undefined;
    type: number | CameraType | undefined;
    setCameraReady: (value: boolean) => void;
    cameraRef: React.RefObject<Camera> | null;
}

const CameraContainerView: React.FC<Props> = ({ flashMode, type, setCameraReady, cameraRef }) => {
    const windowWidth = Dimensions.get('window').width;

    const getMaxWidth = () => {
        const windowWidth = Dimensions.get('window').width;

        if (Platform.OS === 'web') {
            return 600;
        }

        return Math.floor(windowWidth);
    };

    const boxRef = useRef<IBoxProps>(null);

    return (
        <Box
            ref={boxRef}
            w='100%'
            h='100%'
            justifyContent={'center'}
            alignItems='center'
            backgroundColor={colors.black}
        >
            <Camera
                ratio='4:3'
                ref={cameraRef}
                style={{
                    aspectRatio: 1 / (4 / 3),
                    width: getMaxWidth(),
                    height: getMaxWidth() * 1.4,
                }}
                onCameraReady={() => setCameraReady(true)}
                type={type}
                flashMode={flashMode}
                useCamera2Api={true}
            />
        </Box>
    );
};

export default CameraContainerView;

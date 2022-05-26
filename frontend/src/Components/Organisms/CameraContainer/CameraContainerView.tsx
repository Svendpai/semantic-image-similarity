import { Box, IBoxProps } from 'native-base';
import { useRef, useState } from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { colors } from '../../Atoms/Colors';

interface Props {
    flashMode: number | FlashMode | undefined;
    type: number | CameraType | undefined;
    setCameraReady: (value: boolean) => void;
    cameraRef: React.RefObject<Camera> | null;
    overlayImageUri: string | undefined;
    overlayImageOpacity: number;
    overlayActivated: boolean;
}

const CameraContainerView: React.FC<Props> = ({
    flashMode,
    type,
    setCameraReady,
    cameraRef,
    overlayActivated,
    overlayImageOpacity,
    overlayImageUri,
}) => {
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
                useCamera2Api={false}
            />
            {overlayActivated && overlayImageUri && (
                <Image
                    source={{ uri: overlayImageUri }}
                    style={{
                        width: getMaxWidth(),
                        height: getMaxWidth() * 1.4,

                        opacity: overlayImageOpacity,
                        position: 'absolute',
                        zIndex: 100,
                    }}
                />
            )}
        </Box>
    );
};

export default CameraContainerView;

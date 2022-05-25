import { Box } from 'native-base';
import React from 'react';
import ContainerCenteringContent from '../../Atoms/ContainerCenteringContent';
import ContainerHorizontalAlign from '../../Atoms/ContainerHorizontalAlign';
import TextComponent from '../../Atoms/TextComponent';
import CameraButton from '../../Molecules/CameraButton';
import IconButton from '../../Molecules/IconButton';
import IconWithText from '../../Molecules/IconWithText';

type Props = {
    openGallery: () => void;
    flipCamera: () => void;
    takePicture: () => void;
    cameraFlipAvailable: boolean;
    cameraMode: 'instruction' | 'documentation';
};

const CameraFooterControllerView: React.FC<Props> = ({
    openGallery,
    cameraFlipAvailable,
    flipCamera,
    takePicture,
    cameraMode,
}) => {
    return (
        <ContainerCenteringContent>
            <ContainerHorizontalAlign height='30%'>
                <IconWithText text={cameraMode} icon={'image'} color={'white'} />
            </ContainerHorizontalAlign>
            <ContainerHorizontalAlign height='70%' alignItems='space-around'>
                <ContainerCenteringContent width='40%'>
                    <IconButton
                        icon='folder'
                        onPress={openGallery}
                        borderRadius={'full'}
                        color={'dark'}
                        iconColor={'white'}
                        height={'medium'}
                    />
                </ContainerCenteringContent>
                <ContainerCenteringContent width='20%'>
                    <CameraButton onPress={takePicture} />
                </ContainerCenteringContent>
                <ContainerCenteringContent width='40%'>
                    {cameraFlipAvailable && (
                        <IconButton
                            icon='camera-reverse'
                            onPress={flipCamera}
                            borderRadius={'full'}
                            color={'dark'}
                            iconColor={'white'}
                            height={'medium'}
                        />
                    )}
                </ContainerCenteringContent>
            </ContainerHorizontalAlign>
        </ContainerCenteringContent>
    );
};

export default CameraFooterControllerView;

import { Image } from 'native-base';
import React from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import { borderRadiusDict, BorderRadius } from '../Atoms/BorderRadius';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ContainerDashedBorder from '../Atoms/ContainerDashedBorder';
import ContainerVerticalAlign from '../Atoms/ContainerVerticalAlign';
import TextComponent from '../Atoms/TextComponent';

type Props = {
    imageUri: string | undefined;
    show: boolean;
    opacity: number;
};

const ImageOverlay: React.FC<Props> = ({ imageUri, show, children }) => {
    return (
        <>
            
            <ContainerCenteringContent>
                {show && (
                    <Image
                        source={{ uri: imageUri }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            opacity: 0.5,
                            position: 'absolute',
                            zIndex: 100,
                        }}
                    />
                )}
                {children}
            </ContainerCenteringContent>
            
        </>
    );
};

export default ImageOverlay;

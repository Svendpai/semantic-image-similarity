import React from 'react';
import { Image, Touchable, TouchableOpacity } from 'react-native';
import { borderRadiusDict, BorderRadius } from '../Atoms/BorderRadius';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ContainerDashedBorder from '../Atoms/ContainerDashedBorder';
import ContainerVerticalAlign from '../Atoms/ContainerVerticalAlign';
import TextComponent from '../Atoms/TextComponent';

type Props = {
    type: 'instruction' | 'documentation';
    onPress: () => void;
    imageUri: string | undefined;
};

const ImagePlaceholder: React.FC<Props> = ({ type, onPress, imageUri }) => {
    const placeholderText = (
        <>
            <TextComponent color={'dark'} fontSize='medium'>
                Add
            </TextComponent>
            <TextComponent color={'dark'} fontSize='medium' fontWeight='bold'>
                {type}
            </TextComponent>
            <TextComponent color={'dark'} fontSize='medium'>
                image
            </TextComponent>
        </>
    );
    const title = (
        <TextComponent color={'white'} fontSize='medium'>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </TextComponent>
    );

    return (
        <ContainerVerticalAlign paddingY={5}>
            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={onPress}>
                <ContainerCenteringContent height='10%'>{title}</ContainerCenteringContent>
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={{
                            width: '100%',
                            height: '90%',
                            borderRadius: 10,
                        }}
                    />
                ) : (
                    <ContainerDashedBorder borderRadius={'medium'} height='90%'>
                        <ContainerCenteringContent>{placeholderText}</ContainerCenteringContent>
                    </ContainerDashedBorder>
                )}
            </TouchableOpacity>
        </ContainerVerticalAlign>
    );
};

export default ImagePlaceholder;

import { Box, HStack } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import Button from '../../Atoms/Button';
import { Color } from '../../Atoms/Colors';
import ContainerCenteringContent from '../../Atoms/ContainerCenteringContent';
import ContainerHorizontalAlign from '../../Atoms/ContainerHorizontalAlign';
import ContainerVerticalAlign from '../../Atoms/ContainerVerticalAlign';
import IconWithText from '../../Molecules/IconWithText';
import ProgressbarLabeled from '../../Molecules/ProgressbarLabeled';

const EditImageFooterView: React.FC<{ text: string; buttonColor: Color; onPress: () => void; textColor?: Color }> = ({
    onPress,
    text,
    buttonColor,
    textColor,
}) => {
    const evalauteTextColor = (backgroundColor: Color): 'black' | 'white' => {
        switch (backgroundColor) {
            case 'white':
                return 'black';
            case 'black':
                return 'white';
            case 'danger':
                return 'white';
            default:
                return 'black';
        }
    };

    return (
        <ContainerHorizontalAlign>
            <Button onPress={onPress} color={buttonColor} borderRadius='medium' height='large' width={'100%'}>
                <HStack w='100%' h='100%' alignItems={'center'} justifyContent={'center'}>
                    <IconWithText icon='send' color={evalauteTextColor(buttonColor)} text={text} />
                </HStack>
            </Button>
        </ContainerHorizontalAlign>
    );
};

export default EditImageFooterView;

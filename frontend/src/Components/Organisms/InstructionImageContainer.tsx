import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { RootState } from '../../Redux/store';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ImagePlaceholder from '../Molecules/ImagePlaceholder';

type Props = {};

const InstructionImageContainer: React.FC<Props> = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const navigateToInstructionCamera = () => {
        navigation.navigate('InstructionCamera');
    };

    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);
    return (
        <ContainerCenteringContent>
            <ImagePlaceholder type='instruction' onPress={navigateToInstructionCamera} imageUri={instructionImage} />
        </ContainerCenteringContent>
    );
};

export default InstructionImageContainer;

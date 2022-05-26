import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { RootState } from '../../Redux/store';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import { ModalHandle } from '../Atoms/ModalCentered';
import ImagePlaceholder from '../Molecules/ImagePlaceholder';

type Props = {
    warningModalRef: React.RefObject<ModalHandle>;
};

const InstructionImageContainer: React.FC<Props> = ({ warningModalRef }) => {
    
    const displayWarning = () => {
        warningModalRef?.current?.display();
    };

    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);
    return (
        <ContainerCenteringContent>
            <ImagePlaceholder type='instruction' onPress={displayWarning} imageUri={instructionImage} />
        </ContainerCenteringContent>
    );
};

export default InstructionImageContainer;

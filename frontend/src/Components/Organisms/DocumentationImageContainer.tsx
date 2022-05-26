import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { RootState } from '../../Redux/store';
import { colors } from '../Atoms/Colors';
import TextComponent from '../Atoms/TextComponent';
import ImagePlaceholder from '../Molecules/ImagePlaceholder';

type Props = {};

const DocumentationImageContainer: React.FC<Props> = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const navigateToDocumentatationImage = () => {
        console.log('navigating to docuemntaiton');
        navigation.navigate('DocumentationCamera');
    };
    const documentationImage = useSelector((state: RootState) => state.camera.documentationImage);
    return (
        <ImagePlaceholder
            type={'documentation'}
            onPress={navigateToDocumentatationImage}
            imageUri={documentationImage}
        />
    );
};

export default DocumentationImageContainer;

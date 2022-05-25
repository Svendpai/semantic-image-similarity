import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Spacer } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { storeTempImage } from '../../../Redux/Slices/cameraSlice';
import ContainerHorizontalAlign from '../../Atoms/ContainerHorizontalAlign';
import ContainerVerticalAlign from '../../Atoms/ContainerVerticalAlign';
import Icon from '../../Atoms/Icons';
import IconButton from '../../Molecules/IconButton';
import ProgressbarLabeled from '../../Molecules/ProgressbarLabeled';

type Props = {};

const EditImageStatusControllerView: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <ContainerVerticalAlign>
            <ProgressbarLabeled progress={50} color={'danger'} measure={'Similarity'} />;
        </ContainerVerticalAlign>
    );
};

export default EditImageStatusControllerView;

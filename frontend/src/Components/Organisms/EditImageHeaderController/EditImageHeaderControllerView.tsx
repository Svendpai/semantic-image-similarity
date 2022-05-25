import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Spacer } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../../navigation/NavigationTypes';

import ContainerHorizontalAlign from '../../Atoms/ContainerHorizontalAlign';
import Icon from '../../Atoms/Icons';
import IconButton from '../../Molecules/IconButton';

type Props = {};

const CameraHeaderControllerView: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const cancel = () => {
        navigation.navigate('DocumentationCamera');
    };
    return (
        <ContainerHorizontalAlign alignItems='space-between' paddingX={5}>
            <IconButton icon='cancel' iconColor='white' onPress={cancel} height={'large'} iconSize='medium' />
        </ContainerHorizontalAlign>
    );
};

export default CameraHeaderControllerView;

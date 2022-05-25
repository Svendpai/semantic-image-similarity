import { Camera } from 'expo-camera';
import React, { useEffect, useRef } from 'react';
import CameraFooterController from '../Organisms/CameraFooterController/CameraFooterController';
import CameraHeaderController from '../Organisms/CameraHeaderController/CameraHeaderController';
import CameraContainer from '../Organisms/CameraContainer/CameraContainer';
import CameraTemplate from '../TemplateLayout/CameraTemplate';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ModalCentered, { ModalHandle } from '../Atoms/ModalCentered';

type Props = {};

const DocumentationCamera: React.FC<Props> = () => {
    const cameraRef = React.useRef<Camera>(null);
    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    useFocusEffect(
        React.useCallback(() => {
            if (!instructionImage) {
                console.log('navigating to home because there is not instruction image');
                navigation.navigate('Home');
            }
        }, [])
    );

    const ref = useRef<ModalHandle>(null);

    return (
        <ContainerCenteringContent>
            <CameraTemplate
                CameraBody={<CameraContainer cameraRef={cameraRef} />}
                CameraHeader={<CameraHeaderController modalRef={ref} />}
                CameraFooter={<CameraFooterController cameraRef={cameraRef} cameraMode='documentation' />}
            />
            <ModalCentered
                ref={ref}
                onContinue={() => {
                    navigation.navigate('Home');
                }}
            />
        </ContainerCenteringContent>
    );
};

export default DocumentationCamera;

import { Camera, CameraType } from 'expo-camera';
import React from 'react';

import CameraFooterController from '../Organisms/CameraFooterController/CameraFooterController';
import CameraHeaderController from '../Organisms/CameraHeaderController/CameraHeaderController';

import CameraTemplate from '../TemplateLayout/CameraTemplate';

import CameraContainer from '../Organisms/CameraContainer/CameraContainer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ModalCentered, { ModalHandle } from '../Atoms/ModalCentered';
import InstructionCameraFooter from '../Organisms/CameraFooterController/InstructionCameraFooter';

type Props = {};

const InstructionCamera: React.FC<Props> = () => {
    const cameraRef = React.useRef<Camera>(null);
    const modalRef = React.useRef<ModalHandle>(null);

    return (
        <ContainerCenteringContent>
            <CameraTemplate
                CameraBody={<CameraContainer cameraRef={cameraRef} />}
                CameraHeader={<CameraHeaderController modalRef={modalRef} />}
                CameraFooter={<InstructionCameraFooter cameraRef={cameraRef} />}
            />
            <ModalCentered onContinue={() => {}} ref={modalRef} />
        </ContainerCenteringContent>
    );
};

export default InstructionCamera;

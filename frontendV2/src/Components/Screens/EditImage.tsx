import React, { useContext, useRef } from 'react';
import EditImageTemplate from '../TemplateLayout/EditImageTemplate';
import EditImageHeaderControllerView from '../Organisms/EditImageHeaderController/EditImageHeaderControllerView';
import EditImageBody from '../Organisms/EditImageBody.tsx/EditImageBody';
import EditImageStatusControllerView from '../Organisms/EditImageStatusController/EditImageStatusControllerView';
import EditImageFooterView from '../Organisms/EditImageFooter/EditImageFooterView';
import EditImageFooter from '../Organisms/EditImageFooter/EditImageFooter';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ModalCentered, { ModalHandle } from '../Atoms/ModalCentered';
import { EvaluatorContext } from '../../../App';
import TextComponent from '../Atoms/TextComponent';
import ApplicationBackground from '../Organisms/ApplicationBackground';

type Props = {};

const EditImage: React.FC<Props> = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);

    useFocusEffect(
        React.useCallback(() => {
            if (!instructionImage) {
                console.log('navigating to home because there is not instruction image');
                navigation.navigate('Home');
            }
        }, [])
    );
    const ref = useRef<ModalHandle>(null);
    const context = useContext(EvaluatorContext);

    return (
        <ApplicationBackground padding={'4%'}>
            <ContainerCenteringContent>
                {!context.state.loading ? (
                    <>
                        <EditImageTemplate
                            EditImageHeader={<EditImageHeaderControllerView />}
                            EditImageBody={<EditImageBody />}
                            EditImageFooter={<EditImageFooter modalRef={ref} />}
                        />
                        <ModalCentered
                            ref={ref}
                            onContinue={() => {
                                navigation.navigate('Home');
                            }}
                        />
                    </>
                ) : (
                    <TextComponent color='white' fontWeight='bold' fontSize='large'>
                        Waiting for evaluation...
                    </TextComponent>
                )}
            </ContainerCenteringContent>
        </ApplicationBackground>
    );
};

export default EditImage;

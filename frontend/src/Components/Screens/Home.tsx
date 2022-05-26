import React, { useContext, useRef } from 'react';
import HomeHeader from '../Organisms/HomeHeader';
import ImageContainer from '../Organisms/DocumentationImageContainer';
import HomeTemplate from '../TemplateLayout/HomeTemplate';
import DocumentationImageContainer from '../Organisms/DocumentationImageContainer';
import InstructionImageContainer from '../Organisms/InstructionImageContainer';
import LabeledSelector from '../Molecules/LabeledSelector';
import ColorMarkedTextBox from '../Molecules/ColorMarkedTextBox';
import ModelReponseTable from '../Organisms/ModelResponseTable';
import FeedbackMethodSelector from '../Organisms/FeedbackMethodSelector/FeedbackMethodSelector';
import { EvaluatorContext } from '../../../App';
import ModalWarning2 from '../Atoms/ModalWarning2';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import { ModalHandle } from '../Atoms/ModalCentered';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {};

const Home: React.FC<Props> = () => {
    const context = useContext(EvaluatorContext);
    const modalRef = useRef<ModalHandle>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const onContinue = () => {
        navigation.navigate('InstructionCamera');
    };

    return (
        <ContainerCenteringContent>
            <HomeTemplate
                HeaderComponent={<HomeHeader />}
                ImageContainer1={<DocumentationImageContainer />}
                ImageContainer2={<InstructionImageContainer warningModalRef={modalRef} />}
                FeedbackMethodSelector={<FeedbackMethodSelector />}
                FeedbackScoreOverview={<ModelReponseTable evaluators={context.state.reducerState.evaluators} />}
            />
            <ModalWarning2 onContinue={onContinue} ref={modalRef} />
        </ContainerCenteringContent>
    );
};

export default Home;

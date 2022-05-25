import React, { useContext } from 'react';
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

type Props = {};

const Home: React.FC<Props> = () => {
    const context = useContext(EvaluatorContext);

    return (
        <HomeTemplate
            HeaderComponent={<HomeHeader />}
            ImageContainer1={<DocumentationImageContainer />}
            ImageContainer2={<InstructionImageContainer />}
            FeedbackMethodSelector={<FeedbackMethodSelector />}
            FeedbackScoreOverview={<ModelReponseTable evaluators={context.state.reducerState.evaluators} />}
        />
    );
};

export default Home;

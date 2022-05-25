import React, { useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { EvaluatorContext } from '../../../../App';
import { IDocumentationImageEvaluator } from '../../../Domain/Interfaces/IDocumentationImageEvaluator';
import { ImageEvaluation } from '../../../Domain/Types/ImageEvaluation';
import { RootState } from '../../../Redux/store';
import ContainerCenteringContent from '../../Atoms/ContainerCenteringContent';
import ContainerVerticalAlign from '../../Atoms/ContainerVerticalAlign';
import TextComponent from '../../Atoms/TextComponent';
import ProgressbarLabeled from '../../Molecules/ProgressbarLabeled';
import EditImageFooter from '../EditImageFooter/EditImageFooter';
import EditImageBodyView from './EditImageBodyView';

const EditImageBody: React.FC<{}> = ({}) => {
    const documentationImage = useSelector((state: RootState) => state.camera.documentationImage);
    const selectedLiveFeedbackMethod = useSelector((state: RootState) => state.camera.liveFeedbackMethod);
    const context = useContext(EvaluatorContext);

    const getSelectedEvaluator = () => {
        if (!selectedLiveFeedbackMethod && context.state.reducerState.evaluators.length > 0) {
            return context.state.reducerState.evaluators[0];
        }
        return context.state.reducerState.evaluators.find((evaluator) => evaluator.name === selectedLiveFeedbackMethod);
    };

    const [selectedEvaluator, setSelectedEvaluator] = React.useState<IDocumentationImageEvaluator | undefined>(
        getSelectedEvaluator()
    );

    useEffect(() => {
        setSelectedEvaluator(getSelectedEvaluator());
    }, [selectedLiveFeedbackMethod, context.state.reducerState.evaluators]);

    return (
        <>
            {documentationImage && selectedEvaluator && (
                <>
                    <EditImageBodyView documentationImage={documentationImage} evaluator={selectedEvaluator} />
                </>
            )}
        </>
    );
};

export default EditImageBody;

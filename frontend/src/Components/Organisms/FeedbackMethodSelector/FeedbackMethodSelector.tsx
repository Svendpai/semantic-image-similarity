import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EvaluatorContext } from '../../../../App';
import { RegisteredEvaluator } from '../../../Domain/EvaluatorAPI';
import { IDocumentationImageEvaluator } from '../../../Domain/Interfaces/IDocumentationImageEvaluator';
import { setSelectedLiveFeedbackMethod } from '../../../Redux/Slices/cameraSlice';
import { RootState } from '../../../Redux/store';
import LabeledSelector from '../../Molecules/LabeledSelector';

const FeedbackMethodSelector: React.FC = () => {
    const selectedLiveFeedbackMethod = useSelector((state: RootState) => state.camera.liveFeedbackMethod);
    const context = useContext(EvaluatorContext);
    const dispatch = useDispatch();

    const dataToLabel = (evaluator: IDocumentationImageEvaluator) => {
        return evaluator.name;
    };

    const selectLiveFeedbackMethod = (evaluatorName: RegisteredEvaluator) => {
        dispatch(setSelectedLiveFeedbackMethod(evaluatorName));
    };

    return (
        <LabeledSelector
            data={context.state.reducerState.evaluators}
            dataToLabel={dataToLabel}
            onValueChange={selectLiveFeedbackMethod}
            label='Live Feedback Method'
            selectedValue={selectedLiveFeedbackMethod || ''}
        />
    );
};
export default FeedbackMethodSelector;

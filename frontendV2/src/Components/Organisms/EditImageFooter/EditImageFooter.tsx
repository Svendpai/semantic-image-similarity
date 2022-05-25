import { NavigationRouteContext, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { latest } from 'immer/dist/internal';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EvaluatorContext } from '../../../../App';
import { ImageEvaluation } from '../../../Domain/Types/ImageEvaluation';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { RootState } from '../../../Redux/store';
import { ModalHandle } from '../../Atoms/ModalCentered';
import EditImageFooterView from './EditImageFooterView';

const EditImageFooter: React.FC<{ modalRef: React.RefObject<ModalHandle> }> = ({ modalRef }) => {
    const selectedMethod = useSelector((state: RootState) => state.camera.liveFeedbackMethod);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const context = useContext(EvaluatorContext);
    const submitImage = () => {
        if (!getLatestEvaluation()?.documentationIsValid) {
            modalRef.current?.display();
        } else {
            navigation.navigate('Home');
        }
    };
    const [latestEvaluation, setLatestEvaluation] = useState<ImageEvaluation | undefined>();

    const getLatestEvaluation = () => {
        const ltsEval = context.state.reducerState.evaluators.find((e) => e.name === selectedMethod)?.latestEvaluation;
        if (ltsEval) return ltsEval;
        return context.state.reducerState.evaluators[0]?.latestEvaluation;
    };

    const evaluateButtonColor = (evaluation: ImageEvaluation): 'danger' | 'white' => {
        return evaluation.documentationIsValid ? 'white' : 'danger';
    };

    const evaluateButtonText = (evaluation: ImageEvaluation): string => {
        return evaluation.documentationIsValid ? 'Submit' : 'Force Submit';
    };

    useEffect(() => {
        setLatestEvaluation(getLatestEvaluation());
    }, [context.state.reducerState.evaluators, selectedMethod, context.state.loading]);

    return (
        <>
            {latestEvaluation && (
                <EditImageFooterView
                    onPress={submitImage}
                    buttonColor={evaluateButtonColor(latestEvaluation)}
                    text={evaluateButtonText(latestEvaluation)}
                />
            )}
        </>
    );
};

export default EditImageFooter;

import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import { Root } from './src/navigation/Navigation';
import React, { useState } from 'react';
import {
    EvaluatorAPI,
    RegisteredBlurCalculator,
    RegisteredEvaluator,
    RegisteredLightLevelCalculator,
    RegisteredSimilarityCalculator,
} from './src/Domain/EvaluatorAPI';
import { TestEvaluator } from './src/Domain/Evaluators/TestEvaluator';
import { IDocumentationImageEvaluator } from './src/Domain/Interfaces/IDocumentationImageEvaluator';
import useAsyncReducer, { AsyncEvaluatorsReducerState, Action, EvaluatorState } from './src/useAsyncReducer';

export const loadAllEvaluators = async (): Promise<IDocumentationImageEvaluator[]> => {
    const similairtyCalculators = EvaluatorAPI.getAllSimilarityCalculators();
    const lightLevelCalculators = EvaluatorAPI.getAllLightLevelCalculators();
    const blurCalculators = EvaluatorAPI.getAllBlurCalculators();
    for (let calculator in similairtyCalculators) {
        const calc = similairtyCalculators[calculator as RegisteredSimilarityCalculator];
        await calc.loadCalculator();
    }
    for (let calculator in lightLevelCalculators) {
        const calc = lightLevelCalculators[calculator as RegisteredLightLevelCalculator];
        await calc.loadCalculator();
    }
    for (let calculator in blurCalculators) {
        const calc = blurCalculators[calculator as RegisteredBlurCalculator];
        await calc.loadCalculator();
    }

    const evaluators: IDocumentationImageEvaluator[] = [
        new TestEvaluator(
            similairtyCalculators.TestSimilarityCalculator,
            lightLevelCalculators.TestLightLevelCalculator,
            blurCalculators.TestBlurCalculator,
            'TestEvaluator'
        ),
    ];

    for (let evaluator of evaluators) {
        if (!evaluator.isEvaluatorReady()) {
            console.log('loading ' + evaluator.name);
            await evaluator.loadEvaluator();
            console.log('done');
        }
    }
    console.log('done');
    return evaluators;
};

async function reducer(state: EvaluatorState, action: Action) {
    switch (action.type) {
        case 'init':
            return { evaluators: await loadAllEvaluators() };
        case 'evaluate':
            const evaluators = state.evaluators;
            const targetEvaluator = evaluators.find((e) => e.name === action.data.evaluator);
            if (!targetEvaluator) return state;
            targetEvaluator.evaluateAsDocumentationImage(action.data.instructionImage, action.data.documentationImage);
            return { evaluators: evaluators };
        case 'evaluateAll':
            //the commented code calculated one at a time
            /*for (let evaluator of state.evaluators) {
                await evaluator.evaluateAsDocumentationImage(
                    action.data.instructionImage,
                    action.data.documentationImage
                );
            }*/

            await Promise.all(
                state.evaluators.map((evaluator) => {
                    return evaluator.evaluateAsDocumentationImage(
                        action.data.instructionImage,
                        action.data.documentationImage
                    );
                })
            );

            return { evaluators: state.evaluators };
        default:
            throw new Error();
    }
}

const EvaluatorContext = React.createContext<{
    state: AsyncEvaluatorsReducerState;
    dispatch: (action: Action) => void;
}>(
    {} as {
        state: AsyncEvaluatorsReducerState;
        dispatch: (action: Action) => void;
    }
);
export { EvaluatorContext };
export default function App() {
    const { state, dispatch } = useAsyncReducer(reducer, { evaluators: [] });

    return (
        <Provider store={store}>
            <EvaluatorContext.Provider value={{ state, dispatch }}>
                <NativeBaseProvider>
                    <SafeAreaProvider>
                        <Root />
                    </SafeAreaProvider>
                </NativeBaseProvider>
            </EvaluatorContext.Provider>
        </Provider>
    );
}

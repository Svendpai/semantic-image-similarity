import { useState } from 'react';
import { RegisteredEvaluator } from './Domain/EvaluatorAPI';
import { IDocumentationImageEvaluator } from './Domain/Interfaces/IDocumentationImageEvaluator';

export type EvaluatorState = {
    evaluators: IDocumentationImageEvaluator[];
};

export type Action =
    | { type: 'init' }
    | { type: 'load' }
    | { type: 'evaluateAll'; data: { instructionImage: string; documentationImage: string } }
    | {
          type: 'evaluate';
          data: { evaluator: RegisteredEvaluator; instructionImage: string; documentationImage: string };
      };

export type AsyncEvaluatorsReducerState = { reducerState: EvaluatorState; loading: boolean; error: any };

const useAsyncReducer = (
    reducer: (state: EvaluatorState, action: Action) => Promise<EvaluatorState>,
    initialState: EvaluatorState
) => {
    const [state, setState] = useState<AsyncEvaluatorsReducerState>({
        reducerState: initialState,
        loading: false,
        error: undefined,
    });

    const dispatch = async (action: Action) => {
        const result = reducer(state.reducerState, action);
        if (typeof result.then === 'function') {
            try {
                setState({ ...state, error: undefined, loading: true });
                const newState = await result;
                setState({ reducerState: newState, error: undefined, loading: false });
            } catch (err) {
                setState({ ...state, error: err, loading: false });
            }
        } else {
            //setState({ reducerState: result, error: undefined, loading: false });
        }
    };

    return { state, dispatch };
};

export default useAsyncReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getAllAlgorithms,
    SimilarityAlgorithm,
    SimilarityResponse,
} from '../../Algorithms/similiarty-algorithms';

export interface CounterState {
    instructionImageUri: string;
    documentationImageUri: string;
    algorithms: SimilarityAlgorithm[];
}

const initialState: CounterState = {
    instructionImageUri: '',
    documentationImageUri: '',
    algorithms: getAllAlgorithms(),
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setInstructionImage: (state, action: PayloadAction<string>) => {
            if (state.documentationImageUri) {
                state.algorithms.forEach((algorithm) => {
                    algorithm.isCalculating = true;
                    algorithm
                        .calculateSimilarity(
                            action.payload,
                            state.documentationImageUri
                        )
                        .then((response) => {
                            console.log('setting something');
                            algorithm.latestSimilarityResponse = response;
                            algorithm.isCalculating = false;
                        });
                });
            }
            state.instructionImageUri = action.payload;
        },
        setDocumentationImage: (state, action: PayloadAction<string>) => {
            state.documentationImageUri = action.payload;
        },
        updateLatestSimilarityResponse: (
            state,
            action: PayloadAction<{
                algorithmIndex: number;
                latestSimilarityResponse: SimilarityResponse;
            }>
        ) => {
            state.algorithms[
                action.payload.algorithmIndex
            ].latestSimilarityResponse =
                action.payload.latestSimilarityResponse;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setInstructionImage, setDocumentationImage } =
    counterSlice.actions;

export default counterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getAllAlgorithms,
    SimilarityAlgorithm,
    SimilarityAlgorithmData,
    SimilarityResponse,
} from '../../Algorithms/similiarty-algorithms';

export interface CounterState {
    instructionImageUri: string;
    documentationImageUri: string;
    algorithmData: SimilarityAlgorithmData[];
}

const initialState: CounterState = {
    instructionImageUri: '',
    documentationImageUri: '',
    algorithmData: getAllAlgorithms().map((algorithm) => {
        let algorithmData: SimilarityAlgorithmData = {
            ...algorithm.algorithmData,
        };
        return algorithmData;
    }),
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setInstructionImage: (state, action: PayloadAction<string>) => {
            state.instructionImageUri = action.payload;
        },
        setDocumentationImage: (state, action: PayloadAction<string>) => {
            state.documentationImageUri = action.payload;
        },
        updateLatestSimilarityResponse: (
            state,
            action: PayloadAction<{
                algorithmIndex: number;
                similarity: number;
                responseTimeInMillis: number;
            }>
        ) => {
            state.algorithmData[
                action.payload.algorithmIndex
            ].latestSimilarityResponse = {
                similarity: action.payload.similarity,
                responseTimeInMillis: action.payload.responseTimeInMillis,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setInstructionImage,
    setDocumentationImage,
    updateLatestSimilarityResponse,
} = counterSlice.actions;

export default counterSlice.reducer;

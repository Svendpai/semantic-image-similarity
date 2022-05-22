import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getAllAlgorithms,
    IImageSimilarityCalculator,
    SimilarityCalculatorData,
    SimilarityResponse,
} from '../../Algorithms/similiarty-algorithms';

export interface CounterState {
    instructionImageUri: string;
    documentationImageUri: string;
    algorithmData: SimilarityCalculatorData[];
}

const initialState: CounterState = {
    instructionImageUri: '',
    documentationImageUri: '',
    algorithmData: getAllAlgorithms().map((algorithm) => {
        let algorithmData: SimilarityCalculatorData = {
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
        setModelLoaded: (
            state,
            action: PayloadAction<{ algorithmIndex: number; isLoaded: boolean }>
        ) => {
            state.algorithmData[action.payload.algorithmIndex].modelLoaded =
                action.payload.isLoaded;
        },
        setModel: (
            state,
            action: PayloadAction<{ algorithmIndex: number; model: boolean }>
        ) => {
            state.algorithmData[action.payload.algorithmIndex].model =
                action.payload.model;
        },

        setModelIsLoading: (
            state,
            action: PayloadAction<{
                algorithmIndex: number;
                isLoading: boolean;
            }>
        ) => {
            state.algorithmData[action.payload.algorithmIndex].modelLoading =
                action.payload.isLoading;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setInstructionImage,
    setDocumentationImage,
    updateLatestSimilarityResponse,
    setModelLoaded,
    setModelIsLoading,
    setModel,
} = counterSlice.actions;

export default counterSlice.reducer;

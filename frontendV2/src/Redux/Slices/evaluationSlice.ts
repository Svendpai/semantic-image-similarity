import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraType, FlashMode } from 'expo-camera';
import { RegisteredEvaluator } from '../../Domain/EvaluatorAPI';
import { ImageEvaluation } from '../../Domain/Types/ImageEvaluation';

export interface EvaluationState {
    documentationImage: string | undefined;
    instructionImage: string | undefined;
    //evaluatorsData: {[key in RegisteredEvaluator]: number};
    //loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: EvaluationState = {
    documentationImage: undefined,
    instructionImage: undefined,
};

const fetchUserById = createAsyncThunk('users/fetchByIdStatus', async (userId: number, thunkAPI) => {
    //const response = await EvaluatorAPI.getEvaluator(evaluatorId)
    //return response.data
});

export const evaluationSlice = createSlice({
    name: 'evaluation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            // Add user to the state array
            //state.entities.push(action.payload);
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = evaluationSlice.actions;

export default evaluationSlice.reducer;

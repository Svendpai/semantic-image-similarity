import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    instructionImageUri: string;
    documentationImageUri: string;
}

const initialState: CounterState = {
    instructionImageUri: '',
    documentationImageUri: '',
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
    },
});

// Action creators are generated for each case reducer function
export const { setInstructionImage, setDocumentationImage } =
    counterSlice.actions;

export default counterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraType, FlashMode } from 'expo-camera';
import { RegisteredEvaluator } from '../../Domain/EvaluatorAPI';

export interface CameraState {
    availableCameraTypes: (number | CameraType)[];
    selectedCameraType: number | CameraType;
    availabelFlashModes: FlashMode[];
    flashMode: number | FlashMode;
    realTimeProcessingToggled: boolean;
    realTimeProcessingAvailable: boolean;
    galleryOpen: boolean;
    galleryPermission: boolean;
    cameraPermission: boolean;
    cameraMode: 'documentation' | 'instruction' | undefined;
    cameraReady: boolean;
    tempImage: string | undefined;
    liveFeedbackMethod: RegisteredEvaluator;
    documentationImage: string | undefined;
    instructionImage: string | undefined;
}

const initialState: CameraState = {
    availableCameraTypes: [],
    selectedCameraType: CameraType.back,
    availabelFlashModes: [],
    flashMode: FlashMode.off,
    realTimeProcessingToggled: false,
    realTimeProcessingAvailable: false,
    galleryOpen: false,
    galleryPermission: false,
    cameraPermission: false,
    cameraMode: undefined,
    cameraReady: false,
    tempImage: undefined,
    liveFeedbackMethod: 'TestEvaluator',
    documentationImage: undefined,
    instructionImage: undefined,
};

export const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {
        setAvailableCameraTypes: (state, action: PayloadAction<(number | CameraType)[]>) => {
            state.availableCameraTypes = action.payload;
        },
        toggleRealTimeProcessing: (state) => {
            state.realTimeProcessingToggled = !state.realTimeProcessingToggled;
        },
        setRealTimeProcessingAvailable: (state, action: PayloadAction<boolean>) => {
            state.realTimeProcessingAvailable = action.payload;
        },
        setAvailableFlashModes: (state, action: PayloadAction<FlashMode[]>) => {
            state.availabelFlashModes = action.payload;
        },
        setSelectedFlashMode: (state, action: PayloadAction<number | FlashMode>) => {
            state.flashMode = action.payload;
        },
        setSelectedCameraType: (state, action: PayloadAction<number | CameraType>) => {
            state.selectedCameraType = action.payload;
        },
        setCameraPermission: (state, action: PayloadAction<boolean>) => {
            state.cameraPermission = action.payload;
        },
        setGalleryPermission: (state, action: PayloadAction<boolean>) => {
            state.galleryPermission = action.payload;
        },
        setGalleryOpen: (state, action: PayloadAction<boolean>) => {
            state.galleryOpen = action.payload;
        },
        setCameraReady: (state, action: PayloadAction<boolean>) => {
            state.cameraReady = action.payload;
        },
        setDocumentationImage: (state, action: PayloadAction<string>) => {
            state.documentationImage = action.payload;
        },
        setInstructionImage: (state, action: PayloadAction<string>) => {
            state.instructionImage = action.payload;
        },
        setSelectedLiveFeedbackMethod: (state, action: PayloadAction<RegisteredEvaluator>) => {
            state.liveFeedbackMethod = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setDocumentationImage,
    setInstructionImage,
    setAvailableCameraTypes,
    toggleRealTimeProcessing,
    setAvailableFlashModes,
    setSelectedCameraType,
    setCameraPermission,
    setGalleryPermission,
    setGalleryOpen,
    setCameraReady,

    setSelectedFlashMode,
    setRealTimeProcessingAvailable,
    setSelectedLiveFeedbackMethod,
} = cameraSlice.actions;

export default cameraSlice.reducer;

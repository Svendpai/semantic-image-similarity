import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './Slices/cameraSlice';
import evaluationReducer from './Slices/evaluationSlice';

export const store = configureStore({
    reducer: {
        camera: cameraReducer,
        evaluation: evaluationReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

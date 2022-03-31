import { NativeRouter, Route, Routes } from 'react-router-native';
import { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import Camera from './src/Screens/Camera/Camera';
import Home from './src/Screens/Home/Home';
import { useFonts } from 'expo-font';
import React from 'react';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <NativeRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/camera/:mode' element={<Camera />} />
                    </Routes>
                </NativeRouter>
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;

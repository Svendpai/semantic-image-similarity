import { NativeRouter, Route, Routes } from 'react-router-native';
import { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import Camera from './src/Screens/Camera/Camera';
import Home from './src/Screens/Home/Home';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import {
    getAllAlgorithms,
    SimilarityAlgorithm,
    SimilarityResponse,
} from './src/Algorithms/similiarty-algorithms';

type Use = {
    algorithms: SimilarityAlgorithm[];
};

export type ModelData = {
    model: any;
    index: number;
};

const useModels = ({ algorithms }: Use) => {
    const [modelLoaded, setModelLoaded] = useState<boolean>(false);
    const [modelIsLoading, setModelIsLoading] = useState<boolean>(true);
    const [models, setModels] = useState<ModelData[]>([]);

    const loadModels = async (algorithms: any) => {
        const modelList: any = [...models];
        for (let i = 0; i < algorithms.length; i++) {
            console.log(
                'loading model for algorithm: ',
                algorithms[i].algorithmData.displayName
            );
            if (!modelList.find((m: any) => m.index === i)) {
                const model = await algorithms[i].loadModel();
                modelList.push({ index: i, model: model });
            }
        }

        setModels(modelList);
    };

    useEffect(() => {
        if (models.length < algorithms.length) loadModels(algorithms);
        console.log(models.length);
    }, []);

    return models;
};

const App = (): JSX.Element => {
    const models = useModels({ algorithms: getAllAlgorithms() });
    console.log(models.length);

    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <NativeRouter>
                    <Routes>
                        <Route path='/' element={<Home models={models} />} />
                        <Route path='/camera/:mode' element={<Camera />} />
                    </Routes>
                </NativeRouter>
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;

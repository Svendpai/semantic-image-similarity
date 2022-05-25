import { NativeRouter, Route, Routes } from 'react-router-native';
import { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import Camera from './src/Screens/Camera/Camera';
import { useFonts } from 'expo-font';
import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import {
    getAllAlgorithms,
    IImageSimilarityCalculator,
    SimilarityResponse,
} from './src/Algorithms/similiarty-algorithms';
import Home from './src/Components/Screens/Home';

type Use = {
    algorithms: IImageSimilarityCalculator[];
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
            console.log('fainlly printed');

            if (!modelList.find((m: any) => m.index === i)) {
                console.log('trying to load model');

                const model = await algorithms[i].loadModel();
                modelList.push({ index: i, model: model });
            }
            console.log('not loading');
        }

        setModels(modelList);
    };

    useEffect(() => {
        if (models.length < algorithms.length) loadModels(algorithms);
        console.log(models.length);
    }, []);

    return models;
};

const App: React.FC = (): JSX.Element => {
    const models = useModels({ algorithms: getAllAlgorithms() });
    //console.log(models.length);

    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <NativeRouter>
                    <Routes>
                        {/*<Route path='/' element={<Home models={models} />} />*/}
                        <Route path='/' element={<Home />} />
                        <Route path='/camera/:mode' element={<Home />} />
                    </Routes>
                </NativeRouter>
            </NativeBaseProvider>
        </Provider>
    );
};

export default registerRootComponent(App);

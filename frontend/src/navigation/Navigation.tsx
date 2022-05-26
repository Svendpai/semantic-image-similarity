import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import DocumentationCamera from '../Components/Screens/DocumentationCamera';
import InstructionCamera from '../Components/Screens/InstructionCamera';
import Home from '../Components/Screens/Home';

import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList } from './NavigationTypes';
import { Platform } from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import {
    setAvailableCameraTypes,
    setAvailableFlashModes,
    setRealTimeProcessingAvailable,
    setSelectedCameraType,
} from '../Redux/Slices/cameraSlice';
import EditImage from '../Components/Screens/EditImage';
import {
    EvaluatorAPI,
    RegisteredBlurCalculator,
    RegisteredLightLevelCalculator,
    RegisteredSimilarityCalculator,
} from '../Domain/EvaluatorAPI';
import { EvaluatorContext } from '../../App';
import TextComponent from '../Components/Atoms/TextComponent';
import { RootState } from '../Redux/store';
import ContainerCenteringContent from '../Components/Atoms/ContainerCenteringContent';
import ApplicationBackground from '../Components/Organisms/ApplicationBackground';
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Root = () => {
    const documentaionImage = useSelector((state: RootState) => state.camera.documentationImage);
    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);
    const context = useContext(EvaluatorContext);
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(true);

    const getAvailableCameraTypes = async (): Promise<CameraType[]> => {
        if (Platform.OS === 'web') {
            return await Camera.getAvailableCameraTypesAsync();
        } else {
            return [CameraType.back, CameraType.front];
        }
    };

    const getAvailableFlashModes = () => {
        if (Platform.OS === 'web') {
            return [FlashMode.off];
        } else {
            return [FlashMode.off, FlashMode.on, FlashMode.auto, FlashMode.torch];
        }
    };

    const loadInitialState = async () => {
        context.dispatch({ type: 'init' });
        const availableCameraTypes = await getAvailableCameraTypes();
        const availableFlashModes: FlashMode[] = getAvailableFlashModes();
        const realTimeUpdatesAvailable = true;
        dispatch(setAvailableCameraTypes(availableCameraTypes));
        dispatch(setAvailableFlashModes(availableFlashModes));
        dispatch(setRealTimeProcessingAvailable(realTimeUpdatesAvailable));
    };

    //ready the app and load the initial resources into redux
    useEffect(() => {
        let mounted = true;
        loadInitialState().then(() => {
            if (mounted) {
                setLoading(false);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const allEvaluatersReady = () => {
        if (context.state.reducerState.evaluators.length <= 0) return false;
        for (let evaluator of context.state.reducerState.evaluators) {
            if (!evaluator.isEvaluatorReady()) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        if (documentaionImage && instructionImage) {
            console.log('Evaluate all');
            context.dispatch({
                type: 'evaluateAll',
                data: { instructionImage, documentationImage: documentaionImage },
            });
        }
    }, [documentaionImage, instructionImage]);

    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <RootStack.Screen name='Home' component={!loading && allEvaluatersReady() ? Home : Loading} />
                <RootStack.Screen name='Editimage' component={!loading && allEvaluatersReady() ? EditImage : Loading} />
                <RootStack.Screen
                    name='DocumentationCamera'
                    component={!loading && allEvaluatersReady() ? DocumentationCamera : Loading}
                />
                <RootStack.Screen
                    name='InstructionCamera'
                    component={!loading && allEvaluatersReady() ? InstructionCamera : Loading}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

const Loading: React.FC<{}> = () => {
    return (
        <ApplicationBackground>
            <ContainerCenteringContent>
                <TextComponent fontSize='large' fontWeight='bold' color='white'>
                    Waiting for models to load...
                </TextComponent>
            </ContainerCenteringContent>
        </ApplicationBackground>
    );
};

export { Root };

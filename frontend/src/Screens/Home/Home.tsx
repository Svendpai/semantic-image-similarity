import React, { useEffect, useMemo } from 'react';
import { RootState } from '../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Button,
    HStack,
    ScrollView,
    Text,
    View,
    VStack,
} from 'native-base';
import { useNavigate } from 'react-router-native';
import { useFonts } from 'expo-font';
import { TouchableOpacity, Image, Platform } from 'react-native';

import TensorCamera from '../Camera/TensorCamera';
import {
    getAllAlgorithms,
    IImageSimilarityCalculator,
} from '../../Algorithms/similiarty-algorithms';
import {
    setModel,
    setModelIsLoading,
    setModelLoaded,
    updateLatestSimilarityResponse,
} from '../../Redux/Slices/templateSlice';
import { SimilarityAlgorithmComponent } from './SimilarityAlgorithmComponent';
import { ModelData } from '../../../App';

interface HomeProps {
    models: ModelData[];
}

const Home: React.FC<HomeProps> = ({ models }) => {
    const count = useSelector((state: RootState) => state.counter);

    const navigate = useNavigate();

    const getModelByIndex = (index: number) => {
        models.forEach((model) => console.log(model.index));
        const model = models.find((model) => model.index == index);

        return model;
    };

    let [fontsLoaded] = useFonts({
        'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View>
                <Text>{'fonts loading'}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                flexDirection: 'column',
                padding: 20,
            }}
        >
            <Box
                safeAreaTop
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 100,
                }}
            >
                <Text
                    style={{
                        height: 40,
                        fontFamily: 'Poppins-Bold',
                        color: 'white',
                        fontSize: 20,
                    }}
                >
                    {'Match Overlay'}
                </Text>
            </Box>
            <HStack
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 'auto',
                    width: '100%',
                }}
            >
                <TouchableOpacity
                    style={{ width: '50%' }}
                    onPress={() => {
                        navigate('/camera/instruction');
                    }}
                >
                    <Box
                        style={{
                            height: 'auto',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Poppins-Bold',
                                color: 'white',
                                fontSize: 15,
                            }}
                        >
                            {'Instruction'}
                        </Text>
                        {count.instructionImageUri ? (
                            <Image
                                source={{ uri: count.instructionImageUri }}
                                style={{
                                    width: '90%',
                                    height: 180,
                                    borderRadius: 10,
                                }}
                            />
                        ) : (
                            <Box
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    borderRadius: 10,
                                    height: 200,
                                    width: '90%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderStyle: 'dashed',
                                }}
                            >
                                <Text
                                    textAlign={'center'}
                                    fontSize={12}
                                    fontFamily={'Poppins-Medium'}
                                    color={'#d3d3d3'}
                                >
                                    {' '}
                                    add{' '}
                                </Text>
                                <Text
                                    textAlign={'center'}
                                    fontSize={12}
                                    fontFamily={'Poppins-Bold'}
                                    color={'#d3d3d3'}
                                >
                                    {' '}
                                    instruction{' '}
                                </Text>
                                <Text
                                    textAlign={'center'}
                                    fontSize={12}
                                    fontFamily={'Poppins-Medium'}
                                    color={'#d3d3d3'}
                                >
                                    {' '}
                                    image{' '}
                                </Text>
                            </Box>
                        )}
                    </Box>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ width: '50%' }}
                    onPress={() => {
                        navigate('/camera/documentation');
                    }}
                >
                    <Box
                        style={{
                            height: 'auto',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Poppins-Bold',
                                color: 'white',
                                fontSize: 15,
                            }}
                        >
                            Documentation
                        </Text>
                        {count.documentationImageUri ? (
                            <Image
                                source={{
                                    uri: count.documentationImageUri,
                                }}
                                style={{
                                    width: '90%',
                                    height: 180,
                                    borderRadius: 10,
                                }}
                            />
                        ) : (
                            <Box
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d3d3d3',
                                    borderRadius: 10,
                                    height: 180,
                                    width: '90%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderStyle: 'dashed',
                                }}
                            >
                                <Text
                                    textAlign={'center'}
                                    fontSize={12}
                                    fontFamily={'Poppins-Medium'}
                                    color={'#d3d3d3'}
                                >
                                    {' '}
                                    add{' '}
                                </Text>
                                <Text
                                    textAlign={'center'}
                                    fontSize={12}
                                    fontFamily={'Poppins-Bold'}
                                    color={'#d3d3d3'}
                                >
                                    {' '}
                                    documentation{' '}
                                </Text>
                                <Text
                                    textAlign={'center'}
                                    fontSize={12}
                                    fontFamily={'Poppins-Medium'}
                                    color={'#d3d3d3'}
                                >
                                    {' '}
                                    image{' '}
                                </Text>
                            </Box>
                        )}
                    </Box>
                </TouchableOpacity>
            </HStack>
            <VStack style={{ alignItems: 'center' }}>
                <Box style={{ width: '100%', margin: 10 }}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Bold',
                            color: 'white',
                            fontSize: 15,
                        }}
                    >
                        {' '}
                        {'Score'}
                    </Text>
                </Box>
                {getAllAlgorithms().map((algorithm, index) => {
                    return (
                        <React.Fragment
                            key={algorithm.algorithmData.displayName}
                        >
                            <SimilarityAlgorithmComponent
                                model={getModelByIndex(index)}
                                key={algorithm.algorithmData.displayName + '1'}
                                algorithm={algorithm}
                                index={index}
                            />
                        </React.Fragment>
                    );
                })}

                <Box></Box>
            </VStack>
        </ScrollView>
    );
};
export default Home;

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
    SimilarityAlgorithm,
} from '../../Algorithms/similiarty-algorithms';
import { updateLatestSimilarityResponse } from '../../Redux/Slices/templateSlice';

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const count = useSelector((state: RootState) => state.counter);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let [fontsLoaded] = useFonts({
        'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    });

    const activateAlgorithm = (
        algorithm: SimilarityAlgorithm,
        index: number
    ) => {
        console.log(
            'Activating algorithm: ',
            algorithm.algorithmData.displayName
        );
        algorithm
            .calculateSimilarity(
                count.documentationImageUri,
                count.instructionImageUri
            )
            .then((response) => {
                dispatch(
                    updateLatestSimilarityResponse({
                        algorithmIndex: index,
                        responseTimeInMillis: response.responseTimeInMillis,
                        similarity: response.similarity,
                    })
                );
            });
    };

    useEffect(() => {
        if (count.documentationImageUri && count.instructionImageUri) {
            getAllAlgorithms().forEach((algorithm, index) => {
                if (algorithm.algorithmData.modelLoaded) {
                    activateAlgorithm(algorithm, index);
                } else {
                    console.log(
                        'loading model for algorithm: ',
                        algorithm.algorithmData.displayName
                    );
                    algorithm.loadModel().then(() => {
                        activateAlgorithm(algorithm, index);
                    });
                }
            });
        }
    }, [count.documentationImageUri, count.instructionImageUri]);

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
                    onPress={() => {
                        navigate('/camera/instruction');
                    }}
                >
                    <Box
                        style={{
                            height: 'auto',
                            width: 150,
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
                                    width: 150,
                                    height: 200,
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
                                    width: '100%',
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
                    onPress={() => {
                        navigate('/camera/documentation');
                    }}
                >
                    <Box
                        style={{
                            height: 'auto',
                            width: 150,
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
                                    width: 150,
                                    height: 200,
                                    borderRadius: 10,
                                }}
                            />
                        ) : (
                            <Box
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d3d3d3',
                                    borderRadius: 10,
                                    height: 200,
                                    width: '100%',
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
                {count.algorithmData.map((algorithm, index) => {
                    return (
                        <Box
                            key={index}
                            style={{
                                width: '100%',
                                height: 120,
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: '#404040',
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Bold',
                                    color: 'white',
                                    fontSize: 12,
                                }}
                            >
                                {' '}
                                {algorithm.displayName}
                            </Text>

                            {count.documentationImageUri &&
                            count.instructionImageUri ? (
                                <>
                                    {algorithm.isCalculating ? (
                                        <>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: 'white',
                                                    fontSize: 10,
                                                }}
                                            >
                                                {' '}
                                                {'Calculating...'}
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: 'white',
                                                    fontSize: 10,
                                                }}
                                            >
                                                {' '}
                                                {'Similarity: ' +
                                                    algorithm
                                                        .latestSimilarityResponse
                                                        ?.similarity}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: 'white',
                                                    fontSize: 10,
                                                }}
                                            >
                                                {' '}
                                                {'Response Time (millis): ' +
                                                    algorithm
                                                        .latestSimilarityResponse
                                                        ?.responseTimeInMillis}
                                            </Text>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Bold',
                                        color: 'white',
                                        fontSize: 10,
                                    }}
                                >
                                    {
                                        "You haven't uploaded both images yet.. \n Upload images to get started!"
                                    }
                                </Text>
                            )}
                        </Box>
                    );
                })}

                <Box></Box>
            </VStack>
        </ScrollView>
    );
};
export default Home;

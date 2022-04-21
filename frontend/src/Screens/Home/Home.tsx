import React, { useEffect } from 'react';
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
import { getAllAlgorithms } from '../../Algorithms/similiarty-algorithms';

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
    if (!fontsLoaded) {
        return (
            <View>
                <Text>{'fonts loading'}</Text>
            </View>
        );
    }

    /*
    //data_set: [img1, img2, label]
data_set = []
for i in range(n-classes)
    for j in range(50):
        #append true
        data_set.append([dic[i][radnom between 0, n-elements/pr.class], dic[i][radnom between 0, n-elements/pr.class], 1)

        #append false
        data_set.append([dic[i][radnom between 0, n-elements/pr.class], dic[random between 0, n-classes][radnom between 0, n-elements/pr.class], 0)


    */

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
                        console.log('pressed documentation image');
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
                {count.algorithms.map((algorithm, index) => {
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

import { Box } from 'native-base';

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllAlgorithms,
    SimilarityAlgorithm,
    SimilarityAlgorithmData,
    SimilarityResponse,
} from '../../Algorithms/similiarty-algorithms';
import { updateLatestSimilarityResponse } from '../../Redux/Slices/templateSlice';
import { RootState } from '../../Redux/store';

interface HomeProps {
    algorithm: SimilarityAlgorithm;
    index: number;
    model: any;
}

const SimilarityAlgorithmComponent: React.FC<HomeProps> = ({
    algorithm,
    index,
    model,
}) => {
    const [modelLoaded, setModelLoaded] = useState<boolean>(false);
    const [modelIsLoading, setModelIsLoading] = useState<boolean>(true);
    const [latestSimilarityData, setLatestSimilarityData] =
        useState<SimilarityResponse | null>(
            algorithm.algorithmData.latestSimilarityResponse
        );

    const count = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch();

    //evaluate loading state
    useEffect(() => {
        if (model) {
            setModelLoaded(true);
        } else {
            setModelLoaded(false);
        }
    }, [model]);

    useEffect(() => {
        console.log('model loaded: ' + !!model);
        if (count.documentationImageUri && count.instructionImageUri) {
            if (model) {
                console.log(
                    'Activating algorithm: ',
                    algorithm.algorithmData.displayName
                );
                algorithm
                    .calculateSimilarity(
                        count.documentationImageUri,
                        count.instructionImageUri,
                        model.model
                    )
                    .then((response) => {
                        console.log('updating response');
                        setLatestSimilarityData(response);
                    });
            }
        }
    }, [count.documentationImageUri, count.instructionImageUri]);

    return (
        <Box
            key={'1' + index}
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
                key={'2' + index}
                style={{
                    fontFamily: 'Poppins-Bold',
                    color: 'white',
                    fontSize: 12,
                }}
            >
                {' '}
                {algorithm.algorithmData.displayName}
            </Text>
            {modelLoaded ? (
                <>
                    {count.documentationImageUri &&
                    count.instructionImageUri ? (
                        <>
                            {!model && !latestSimilarityData ? (
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
                                        key={'3' + index}
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            color: 'white',
                                            fontSize: 10,
                                        }}
                                    >
                                        {'Similarity: ' +
                                            latestSimilarityData?.similarity}
                                    </Text>
                                    <Text
                                        key={'4' + index}
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            color: 'white',
                                            fontSize: 10,
                                        }}
                                    >
                                        {' '}
                                        {'Response Time (millis): ' +
                                            latestSimilarityData?.responseTimeInMillis}
                                    </Text>
                                </>
                            )}
                        </>
                    ) : (
                        <Text
                            key={'5' + index}
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
                </>
            ) : (
                <Text key={'6' + index}>Model Loading...</Text>
            )}
        </Box>
    );
};
export { SimilarityAlgorithmComponent };

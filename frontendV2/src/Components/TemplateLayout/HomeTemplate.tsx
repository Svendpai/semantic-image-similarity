import { Box, HStack, VStack } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import ApplicationBackground from '../Organisms/ApplicationBackground';

type Props = {
    HeaderComponent: React.ReactNode;
    ImageContainer1: React.ReactNode;
    ImageContainer2: React.ReactNode;
    FeedbackMethodSelector: React.ReactNode;
    FeedbackScoreOverview: React.ReactNode;
};

const HomeTemplate: React.FC<Props> = ({
    HeaderComponent,
    ImageContainer1,
    ImageContainer2,
    FeedbackMethodSelector,
    FeedbackScoreOverview,
}) => {
    const instructionImage = useSelector((state: RootState) => state.camera.instructionImage);

    return (
        <ApplicationBackground padding={'4%'}>
            <Box key='header-component' h='10%' w='100%'>
                {HeaderComponent}
            </Box>
            <HStack w='100%' h='40%' justifyContent={'center'}>
                {instructionImage && (
                    <Box w='48%' h='100%' key='image-container-1'>
                        {ImageContainer1}
                    </Box>
                )}
                <Box w='4%' h='100%' />
                <Box w='48%' h='100%' key='image-container-2'>
                    {ImageContainer2}
                </Box>
            </HStack>
            <Box h='10%' w='100%' key='feedback-method-selector'>
                {FeedbackMethodSelector}
            </Box>
            <Box h='40%' w='100%' key='feedback-score-overview'>
                {FeedbackScoreOverview}
            </Box>
        </ApplicationBackground>
    );
};

export default HomeTemplate;

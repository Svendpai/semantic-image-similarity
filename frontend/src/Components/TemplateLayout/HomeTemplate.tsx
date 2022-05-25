import { Box, VStack } from 'native-base';
import React from 'react';

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
    return (
        <Box>
            <Box key='header-component'>{<HeaderComponent />}</Box>
            <VStack>
                <Box key='image-container-1'>{<ImageContainer1 />}</Box>
                <Box key='image-container-2'>{<ImageContainer2 />}</Box>
            </VStack>
            <Box key='feedback-method-selector'>
                {<FeedbackMethodSelector />}
            </Box>
            <Box key='feedback-score-overview'>{<FeedbackScoreOverview />}</Box>
        </Box>
    );
};

export default HomeTemplate;

import { Box } from 'native-base';
import React from 'react';
import ApplicationBackground from '../Organisms/ApplicationBackground';

type Props = {
    CameraHeader: React.ReactNode;
    CameraBody: React.ReactNode;
    CameraFooter: React.ReactNode;
};

const CameraTemplate: React.FC<Props> = ({ CameraHeader, CameraBody, CameraFooter }) => {
    return (
        <ApplicationBackground padding={'4%'}>
            <Box w='100%' h='8%'>
                {CameraHeader}
            </Box>
            <Box w='100%' h='80%'>
                {CameraBody}
            </Box>
            <Box w='100%' h='12%'>
                {CameraFooter}
            </Box>
        </ApplicationBackground>
    );
};

export default CameraTemplate;

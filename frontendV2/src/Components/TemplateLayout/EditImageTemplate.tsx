import { Box } from 'native-base';
import React from 'react';
import ApplicationBackground from '../Organisms/ApplicationBackground';

interface Props {
    EditImageHeader: React.ReactNode;
    EditImageBody: React.ReactNode;

    EditImageFooter: React.ReactNode;
}

const EditImageTemplate: React.FC<Props> = ({ EditImageHeader, EditImageBody, EditImageFooter }) => {
    return (
        <>
            <Box w='100%' h='8%'>
                {EditImageHeader}
            </Box>
            <Box w='100%' h='84%'>
                {EditImageBody}
            </Box>
            <Box w='100%' h='8%'>
                {EditImageFooter}
            </Box>
        </>
    );
};

export default EditImageTemplate;

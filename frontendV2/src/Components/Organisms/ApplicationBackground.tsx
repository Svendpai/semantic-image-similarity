import { Box, VStack } from 'native-base';

import React from 'react';
import { colors } from '../Atoms/Colors';

type Props = {
    padding?: number | string;
};

const ApplicationBackground: React.FC<Props> = ({ children, padding }) => {
    return (
        <Box
            h='100%'
            w='100%'
            backgroundColor={colors.black}
            padding={padding ? padding : 0}
        >
            {children}
        </Box>
    );
};

export default ApplicationBackground;

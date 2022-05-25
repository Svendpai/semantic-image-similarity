import { Box } from 'native-base';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const ContainerTransparrent: React.FC<Props> = ({ children }) => {
    return (
        <Box w='100%' h='100%'>
            {children}
        </Box>
    );
};

const styles = {
    button: {},
};

export default ContainerTransparrent;

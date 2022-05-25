import { Box } from 'native-base';
import React from 'react';

type Props = {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

const ContainerDashedBorder: React.FC<Props> = ({
    children,
    width,
    height,
}) => {
    return (
        <Box alignItems='center' justifyContent='center' w={width} h={height}>
            {children}
        </Box>
    );
};

export default ContainerDashedBorder;

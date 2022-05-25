import { Box } from 'native-base';
import React from 'react';

type Props = {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
};

const ContainerCenteringContent: React.FC<Props> = ({
    children,
    width,
    height,
}) => {
    return (
        <Box
            alignItems='center'
            justifyContent='center'
            w={width ? width : '100%'}
            h={height ? height : '100%'}
        >
            {children}
        </Box>
    );
};

export default ContainerCenteringContent;

import { Box } from 'native-base';
import React from 'react';

type Props = {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
    justifyContent?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around';
    paddingY?: number | string;
};

const ContainerVerticalAlign: React.FC<Props> = ({
    children,
    width,
    height,
    justifyContent,
    paddingY,
}) => {
    return (
        <Box
            justifyContent={justifyContent ? justifyContent : 'space-between'}
            paddingY={paddingY ? paddingY : 0}
            w={width ? width : '100%'}
            h={height ? height : '100%'}
        >
            {children}
        </Box>
    );
};

export default ContainerVerticalAlign;

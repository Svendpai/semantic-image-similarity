import { Box } from 'native-base';
import React from 'react';
import { BorderRadius, borderRadiusDict } from './BorderRadius';

type Props = {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: BorderRadius;
    padding?: number | string;
};

const ContainerCenteringContent: React.FC<Props> = ({ children, width, height, borderRadius, padding }) => {
    return (
        <Box
            borderRadius={borderRadius ? borderRadiusDict[borderRadius] : 0}
            alignItems='center'
            justifyContent='center'
            padding={padding ? padding : 0}
            w={width ? width : '100%'}
            h={height ? height : '100%'}
        >
            {children}
        </Box>
    );
};

export default ContainerCenteringContent;

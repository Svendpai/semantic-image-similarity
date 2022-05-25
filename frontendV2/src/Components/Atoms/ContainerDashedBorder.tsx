import { Box } from 'native-base';
import React from 'react';
import { BorderRadius, borderRadiusDict } from './BorderRadius';
import { colors } from './Colors';

type Props = {
    width?: number | string;
    height?: number | string;
    borderRadius?: BorderRadius;
};

const ContainerDashedBorder: React.FC<Props> = ({
    children,
    borderRadius,
    width,
    height,
}) => {
    return (
        <Box
            w={width ? width : '100%'}
            h={height ? height : '100%'}
            borderRadius={borderRadius ? borderRadiusDict[borderRadius] : 0}
            borderStyle='dashed'
            borderWidth={2}
            borderColor={colors.dark}
        >
            {children}
        </Box>
    );
};

export default ContainerDashedBorder;

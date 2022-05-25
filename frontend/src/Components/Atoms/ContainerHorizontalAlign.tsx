import { Box, HStack } from 'native-base';
import React from 'react';

type Props = {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
    alignItems?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around';
    paddingY?: number | string;
    paddingX?: number | string;
};

const ContainerHorizontalAlign: React.FC<Props> = ({
    children,
    width,
    height,
    alignItems,
    paddingY,
    paddingX,
}) => {
    return (
        <HStack
            alignItems='center' //alignItems ? alignItems : 'space-between'}
            justifyContent={alignItems ? alignItems : 'center'}
            paddingY={paddingY ? paddingY : 0}
            paddingX={paddingX ? paddingX : 0}
            w={width ? width : '100%'}
            h={height ? height : '100%'}
        >
            {children}
        </HStack>
    );
};

export default ContainerHorizontalAlign;

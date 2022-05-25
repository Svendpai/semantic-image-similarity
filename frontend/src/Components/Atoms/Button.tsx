import { border } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import { Box, Pressable } from 'native-base';
import { borderRadiusDict, BorderRadius } from './BorderRadius';
import { Color, colors } from './Colors';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
    children: React.ReactNode;
    color?: Color;
    borderRadius?: BorderRadius;
    onPress: () => void;
};

const Button: React.FC<Props> = ({ color, borderRadius, onPress }) => {
    const style: StyleProp<ViewStyle> = {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: borderRadius
            ? borderRadiusDict[borderRadius]
            : borderRadiusDict.medium,
    };

    return (
        <Box style={style}>
            <Pressable onPress={onPress}></Pressable>
        </Box>
    );
};

export default Button;

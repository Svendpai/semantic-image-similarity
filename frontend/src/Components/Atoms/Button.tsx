import { border } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import { Box, Pressable } from 'native-base';
import { borderRadiusDict, BorderRadius } from './BorderRadius';
import { Color, colors } from './Colors';
import { StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps {
    color?: Color;
    borderRadius?: BorderRadius;
    onPress: () => void;
    height?: ButtonSize;
    width?: number | string;
}
//defines the height of the button
export type ButtonSize = 'small' | 'medium' | 'large' | 'default';

export const buttonSizeDict: { [key in ButtonSize]: number } = {
    small: 20,
    medium: 30,
    large: 40,
    default: 30,
};

const Button: React.FC<ButtonProps> = ({ height, width, color, borderRadius, onPress, children }) => {
    const style: StyleProp<ViewStyle> = {
        height: height ? buttonSizeDict[height] : buttonSizeDict['default'],
        width: width ? width : 'auto',
        backgroundColor: color ? colors[color] : 'tranparent',
        borderRadius: borderRadius ? borderRadiusDict[borderRadius] : borderRadiusDict.medium,
    };

    return (
        <Box style={style}>
            <Pressable w='100%' h='100%' justifyContent='center' alignItems='center' onPress={onPress}>
                {children}
            </Pressable>
        </Box>
    );
};

export default Button;

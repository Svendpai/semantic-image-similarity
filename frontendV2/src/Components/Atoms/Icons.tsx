import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Color, colors } from './Colors';

export type IconName =
    | 'chevron-down'
    | 'image'
    | 'folder'
    | 'camera-reverse'
    | 'flash-on'
    | 'flash-off'
    | 'real-time-on'
    | 'real-time-off'
    | 'back'
    | 'cancel'
    | 'send';

export type IconSize = 'small' | 'medium' | 'large' | 'default';

export const iconSizeDict: { [key in IconSize]: number } = {
    default: 12,
    small: 16,
    medium: 20,
    large: 28,
};

type Props = {
    name: IconName;
    color?: Color;
    size?: IconSize;
};

const Icon: React.FC<Props> = ({ name, color, size }) => {
    const colorToUse = color ? colors[color] : colors.black;
    const sizeToUse = size ? iconSizeDict[size] : iconSizeDict['default'];

    switch (name) {
        case 'chevron-down':
            return <Ionicons key={name} name='chevron-down' color={colorToUse} size={sizeToUse} />;
        case 'image':
            return <Ionicons key={name} name='image-outline' color={colorToUse} size={sizeToUse} />;
        case 'folder':
            return <FontAwesome key={name} name='folder-o' color={colorToUse} size={sizeToUse} />;
        case 'camera-reverse':
            return <Ionicons key={name} name='camera-reverse-outline' color={colorToUse} size={sizeToUse} />;
        case 'flash-on':
            return <Ionicons key={name} name='flash' color={colorToUse} size={sizeToUse} />;
        case 'flash-off':
            return <Ionicons key={name} name='flash-off' color={colorToUse} size={sizeToUse} />;
        case 'real-time-on':
            return <Ionicons key={name} name='time' color={colorToUse} size={sizeToUse} />;
        case 'real-time-off':
            return <Ionicons key={name} name='time-outline' color={colorToUse} size={sizeToUse} />;
        case 'back':
            return <Ionicons key={name} name='arrow-back' color={colorToUse} size={sizeToUse} />;
        case 'cancel':
            return <Ionicons key={name} name='close' color={colorToUse} size={sizeToUse} />;
        case 'send':
            return <Ionicons key={name} name='send-outline' color={colorToUse} size={sizeToUse} />;

        default:
            return undefined;
    }
};

export default Icon;

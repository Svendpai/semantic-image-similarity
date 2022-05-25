import React from 'react';
import { FontSize, fontSizes } from './FontSizes';
import { Text } from 'native-base';
import { Color, colors } from './Colors';

type Props = {
    fontSize?: FontSize;
    color?: Color;
};

const TextComponent: React.FC<Props> = ({ fontSize, children, color }) => {
    const style = {
        fontSize: fontSize ? fontSizes[fontSize] : fontSizes.medium,
        color: color ? colors[color] : colors.black,
    };
    return <Text style={style}>{children}</Text>;
};

export default TextComponent;

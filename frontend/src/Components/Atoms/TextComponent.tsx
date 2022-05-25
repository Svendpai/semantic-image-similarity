import React from 'react';
import { FontSize, fontSizes } from './FontSizes';
import { Text } from 'native-base';
import { Color, colors } from './Colors';

type Props = {
    fontSize?: FontSize;
    color?: Color;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'left' | 'center' | 'right';
};

const TextComponent: React.FC<Props> = ({ fontSize, children, color, fontWeight, textAlign }) => {
    const style = {
        fontSize: fontSize ? fontSizes[fontSize] : fontSizes.medium,
        color: color ? colors[color] : colors.black,
        fontWeight: fontWeight ? fontWeight : 'normal',
        textAlign: textAlign ? textAlign : 'left',
    };
    return <Text style={style}>{children}</Text>;
};

export default TextComponent;

import { Box, HStack } from 'native-base';
import React from 'react';
import { Color } from '../Atoms/Colors';

import Icon, { IconName } from '../Atoms/Icons';
import TextComponent from '../Atoms/TextComponent';

type IconWithTextProps = {
    icon: IconName;
    text: string;
    color?: Color;
    textColor?: Color;
};

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text, color }) => {
    return (
        <React.Fragment>
            <Icon name={icon} color={color} size={'small'} />
            <Box w={2} />
            <TextComponent color={color} fontWeight={'bold'}>
                {text}
            </TextComponent>
        </React.Fragment>
    );
};

export default IconWithText;

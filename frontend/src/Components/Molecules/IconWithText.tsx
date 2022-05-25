import { Box, HStack } from 'native-base';
import React from 'react';
import { Color } from '../Atoms/Colors';

import Icon, { IconName } from '../Atoms/Icons';
import TextComponent from '../Atoms/TextComponent';

type Props = {
    icon: IconName;
    text: string;
    color?: Color;
    textColor?: Color;
};

const IconWithText: React.FC<Props> = ({ icon, text, color }) => {
    return (
        <>
            <Icon name={icon} color={color} size={'small'} />
            <Box w={2} />
            <TextComponent color={color} fontWeight={'bold'}>
                {text}
            </TextComponent>
        </>
    );
};

const styles = {
    button: {},
};

export default IconWithText;

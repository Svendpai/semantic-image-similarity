import { Box } from 'native-base';
import React from 'react';
import { borderRadiusDict } from '../Atoms/BorderRadius';
import { Color, colors } from '../Atoms/Colors';
import TextBox, { TextBoxProps } from './TextBox';

interface ColorMarkedTextBoxProps extends TextBoxProps {
    colorMarking: Color;
}

const ColorMarkedTextBox: React.FC<ColorMarkedTextBoxProps> = (props) => {
    const width = props.width || '100%';

    return (
        <Box
            w={props.width ? props.width : '100%'}
            h={props.height ? props.height : '100%'}
            backgroundColor={colors[props.colorMarking]}
            paddingLeft={'3%'}
            borderRadius={
                props.borderRadius
                    ? borderRadiusDict[props.borderRadius]
                    : borderRadiusDict['default']
            }
        >
            <TextBox {...props} width={'100%'} />
        </Box>
    );
};

export default ColorMarkedTextBox;

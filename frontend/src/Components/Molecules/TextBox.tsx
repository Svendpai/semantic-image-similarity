import { Box, Text } from 'native-base';
import { BorderRadius, borderRadiusDict } from '../Atoms/BorderRadius';
import { Color, colors } from '../Atoms/Colors';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import { FontSize, fontSizes } from '../Atoms/FontSizes';
import TextComponent from '../Atoms/TextComponent';

export interface TextBoxProps {
    fontSize?: FontSize;
    color?: Color;
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    backgroundColor?: Color;
    height?: number | string;
    width?: number | string;
    text: string;
    borderRadius?: BorderRadius;
    padding?: number | string;
    xPos?: 'center' | 'left' | 'right';
    yPos?: 'center' | 'top' | 'bottom';
    extraStyles?: any;
}

const TextBox: React.FC<TextBoxProps> = ({
    fontSize,
    color,
    fontWeight,
    width,
    height,
    text,
    borderRadius,
    backgroundColor,
    xPos,
    yPos,
    padding,
    extraStyles,
}) => {
    const getStyleFromXPos = (xPos: 'center' | 'left' | 'right') => {
        return xPos === 'right'
            ? 'flex-end'
            : xPos === 'left'
            ? 'flex-start'
            : 'center';
    };

    const getStyleFromYPos = (yPos: 'center' | 'top' | 'bottom') => {
        return yPos === 'bottom'
            ? 'flex-end'
            : yPos === 'top'
            ? 'flex-start'
            : 'center';
    };

    return (
        <ContainerCenteringContent height={height} width={width}>
            <Box
                h='100%'
                w='100%'
                padding={padding ? padding : '0'}
                justifyContent={getStyleFromYPos(yPos || 'center')}
                alignItems={getStyleFromXPos(xPos || 'center')}
                backgroundColor={
                    backgroundColor ? colors[backgroundColor] : 'transparent'
                }
                borderRadius={
                    borderRadius
                        ? borderRadiusDict[borderRadius]
                        : borderRadiusDict['default']
                }
                style={{ ...extraStyles }}
            >
                <TextComponent
                    fontSize={fontSize}
                    color={color}
                    fontWeight={fontWeight}
                >
                    {text}
                </TextComponent>
            </Box>
        </ContainerCenteringContent>
    );
};

export default TextBox;

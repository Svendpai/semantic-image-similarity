import React from 'react';
import { colors } from '../Atoms/Colors';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import { Paragraphs } from '../Atoms/Paragraphs';
import TextComponent from '../Atoms/TextComponent';
import HomeTemplate from '../TemplateLayout/HomeTemplate';

type Props = {};

const HomeHeader: React.FC<Props> = () => {
    return (
        <ContainerCenteringContent>
            <TextComponent color={'white'}>
                {Paragraphs.homeTitle}
            </TextComponent>
        </ContainerCenteringContent>
    );
};

export default HomeHeader;

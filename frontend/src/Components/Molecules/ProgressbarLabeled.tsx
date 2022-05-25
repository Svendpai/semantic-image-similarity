import { Box } from 'native-base';
import React from 'react';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ContainerHorizontalAlign from '../Atoms/ContainerHorizontalAlign';
import ContainerVerticalAlign from '../Atoms/ContainerVerticalAlign';
import ProgressBar, { ProgressbarProps } from '../Atoms/ProgressBar';
import TextComponent from '../Atoms/TextComponent';

interface Props extends ProgressbarProps {
    measure: string;
}

const ProgressbarLabeled: React.FC<Props> = (props) => {
    const { color, progress } = props;

    return (
        <ContainerHorizontalAlign alignItems='space-between'>
            <TextComponent fontWeight='bold' fontSize={'medium'} color={'white'}>
                {progress + '% ' + props.measure}
            </TextComponent>

            <ContainerCenteringContent width='60%'>
                <ProgressBar progress={progress} color={color} />
            </ContainerCenteringContent>
        </ContainerHorizontalAlign>
    );
};

export default ProgressbarLabeled;

import { Box } from 'native-base';
import React from 'react';
import ContainerTransparrent from '../Atoms/ContainerTransparrent';
import ContainerVerticalAlign from '../Atoms/ContainerVerticalAlign';
import SelectComponent from '../Atoms/SelectComponent';
import TextComponent from '../Atoms/TextComponent';

interface Props {
    label: string;
    data: any[];
    onValueChange: (value: any) => void;
    dataToLabel: (data: any) => string;
    selectedValue: string;
}

const LabeledSelector: React.FC<Props> = ({ data, onValueChange, label, dataToLabel, selectedValue }) => {
    return (
        <ContainerVerticalAlign paddingY={2}>
            <TextComponent color='white' fontWeight='bold'>
                {label}
            </TextComponent>

            <SelectComponent
                data={data}
                onValueChange={onValueChange}
                selectedValue={selectedValue}
                toLabel={dataToLabel}
            />
        </ContainerVerticalAlign>
    );
};

export default LabeledSelector;

import { Box, Select } from 'native-base';
import React from 'react';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import { borderRadiusDict } from './BorderRadius';
import { colors } from './Colors';
import Icon from './Icons';

type Props<T> = {
    selectedValue: string;
    data: Array<T>;
    onValueChange: (value: T) => void;
    toLabel: (value: T) => string;
};

const SelectComponent: React.FC<Props<any>> = ({ selectedValue, data, onValueChange, toLabel }) => {
    return (
        <Box h={8}>
            <Select
                borderWidth={0}
                dropdownIcon={
                    <Box mr={2}>
                        <Icon name='chevron-down' color='white' size={'medium'} />
                    </Box>
                }
                w='100%'
                h='100%'
                color={colors.white}
                selectedValue={selectedValue}
                borderRadius={borderRadiusDict['medium']}
                onValueChange={onValueChange}
                backgroundColor={colors.dark}
                height={10}
            >
                {data.map((item, index) => {
                    return <Select.Item label={toLabel(item)} value={toLabel(item)} key={index} />;
                })}
            </Select>
        </Box>
    );
};

export default SelectComponent;

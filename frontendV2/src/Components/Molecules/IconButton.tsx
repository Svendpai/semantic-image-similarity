import React from 'react';
import Button, { ButtonProps, buttonSizeDict } from '../Atoms/Button';
import { Color } from '../Atoms/Colors';
import Icon, { IconName, IconSize } from '../Atoms/Icons';

interface IconButtonProps extends ButtonProps {
    icon: IconName;
    iconColor?: Color;
    iconSize?: IconSize;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <Button
            {...props}
            width={props.height ? buttonSizeDict[props.height] : undefined}
        >
            <Icon
                name={props.icon}
                color={props.iconColor}
                size={props.iconSize ? props.iconSize : 'small'}
            />
        </Button>
    );
};

export default IconButton;

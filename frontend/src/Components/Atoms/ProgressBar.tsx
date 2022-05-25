import { Progress } from 'native-base';
import React from 'react';
import { Color, colors } from './Colors';

export interface ProgressbarProps {
    color?: Color;
    progress: number;
}

const ProgressBar: React.FC<ProgressbarProps> = ({ color, progress }) => {
    return (
        <Progress
            width='100%'
            bg={colors['dark']}
            _filledTrack={{
                bg: color ? colors[color] : colors['white'],
            }}
            value={progress}
            mx='4'
        />
    );
};

export default ProgressBar;

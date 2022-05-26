import { Spacer } from 'native-base';
import React from 'react';
import ContainerHorizontalAlign from '../../Atoms/ContainerHorizontalAlign';
import Icon from '../../Atoms/Icons';
import IconButton from '../../Molecules/IconButton';

type Props = {
    toggleRealTimeUpdates: () => void;
    realTimeUpdatesActivated: boolean;
    toggleFlash: () => void;
    flashActivated: boolean;
    goBack: () => void;
    flashAvailable: boolean;
    realTimeUpdatesAvailable: boolean;
    overlayActivated: boolean;
    toggleOverlay: () => void;
    overlayEnabled: boolean;
};

const CameraHeaderControllerView: React.FC<Props> = ({
    toggleFlash,
    toggleRealTimeUpdates,
    toggleOverlay,
    realTimeUpdatesActivated,
    flashActivated,
    flashAvailable,
    realTimeUpdatesAvailable,
    goBack,
    overlayActivated,
    overlayEnabled,
}) => {
    return (
        <ContainerHorizontalAlign alignItems='space-between' paddingX={0} paddingY={10}>
            <IconButton icon='back' iconColor='white' onPress={goBack} height={'large'} iconSize='medium' />
            <Spacer />
            {overlayEnabled && (
                <IconButton
                    icon={overlayActivated ? 'overlay-on' : 'overlay-off'}
                    iconColor='white'
                    onPress={toggleOverlay}
                    height={'large'}
                    iconSize='medium'
                />
            )}
            {flashAvailable && (
                <IconButton
                    icon={flashActivated ? 'flash-on' : 'flash-off'}
                    iconColor='white'
                    onPress={toggleFlash}
                    height={'large'}
                    iconSize='medium'
                />
            )}
            {realTimeUpdatesAvailable && (
                <IconButton
                    icon={realTimeUpdatesActivated ? 'real-time-on' : 'real-time-off'}
                    iconColor='white'
                    onPress={toggleRealTimeUpdates}
                    height={'large'}
                    iconSize='medium'
                />
            )}
        </ContainerHorizontalAlign>
    );
};

export default CameraHeaderControllerView;

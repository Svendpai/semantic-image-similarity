import { Box, Modal } from 'native-base';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import IconWithText from './IconWithText';
import Button from '../Atoms/Button';
import { colors } from '../Atoms/Colors';

import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import ContainerHorizontalAlign from '../Atoms/ContainerHorizontalAlign';
import ContainerVerticalAlign from '../Atoms/ContainerVerticalAlign';
import TextComponent from '../Atoms/TextComponent';

const ModalWarning2: React.FC<{ setShowModal: (show: boolean) => void; onContinue: () => void }> = ({
    setShowModal,
    onContinue,
}) => {
    return (
        <>
            <Box w='100%' h='30%'>
                <ContainerCenteringContent>
                    <TextComponent color={'black'} textAlign='center' fontSize='large' fontWeight='bold'>
                        {'This activity requires a high level of similarity'}
                    </TextComponent>
                </ContainerCenteringContent>
            </Box>
            <Box w='100%' h='50%'>
                <ContainerVerticalAlign paddingY={4}>
                    <TextComponent fontSize='medium' color='black'>
                        {'Are you confident, that the image highligsts the completion of your task?'}
                    </TextComponent>
                    <TextComponent fontSize='medium' color='danger'>
                        <TextComponent fontSize='medium' color='danger' fontWeight='bold'>
                            {'Be aware:'}
                        </TextComponent>{' '}
                        {'the task creator can reject your submission!'}
                    </TextComponent>
                </ContainerVerticalAlign>
            </Box>
            <Box w='100%' h='20%'>
                <ContainerHorizontalAlign alignItems='space-between'>
                    <Button
                        borderRadius='large'
                        color='light'
                        height='large'
                        width={'47%'}
                        onPress={() => {
                            setShowModal(false);
                        }}
                    >
                        <TextComponent fontWeight='bold' color='white'>
                            Cancel
                        </TextComponent>
                    </Button>
                    <Button borderRadius='large' color='danger' height='large' width={'47%'} onPress={onContinue}>
                        <ContainerHorizontalAlign>
                            <IconWithText color='white' icon='send' text='Force Submit' />
                        </ContainerHorizontalAlign>
                    </Button>
                </ContainerHorizontalAlign>
            </Box>
        </>
    );
};

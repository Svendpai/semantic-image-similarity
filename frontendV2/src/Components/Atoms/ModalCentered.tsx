import { Box, Modal } from 'native-base';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import IconWithText from '../Molecules/IconWithText';
import Button from './Button';
import { colors } from './Colors';

import ContainerCenteringContent from './ContainerCenteringContent';
import ContainerHorizontalAlign from './ContainerHorizontalAlign';
import ContainerVerticalAlign from './ContainerVerticalAlign';
import TextComponent from './TextComponent';

type ModalProps = {
    onContinue: () => void;
};

export type ModalHandle = {
    display: () => void;
    close: () => void;
};

const ModalComponent: React.ForwardRefRenderFunction<ModalHandle, ModalProps> = ({ onContinue }, ref) => {
    const [showModal, setShowModal] = React.useState(false);

    useImperativeHandle(ref, () => ({
        display: () => {
            setShowModal(true);
        },
        close: () => {},
    }));

    return (
        <Modal testID='mlModal' isOpen={showModal} closeOnOverlayClick={true} w='100%' h='100%'>
            <Modal.Content w='100%'>
                <Box backgroundColor={colors['white']} w={'100%'} h={260} p={5}>
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
                            <Button
                                borderRadius='large'
                                color='danger'
                                height='large'
                                width={'47%'}
                                onPress={onContinue}
                            >
                                <ContainerHorizontalAlign>
                                    <IconWithText color='white' icon='send' text='Force Submit' />
                                </ContainerHorizontalAlign>
                            </Button>
                        </ContainerHorizontalAlign>
                    </Box>
                </Box>
            </Modal.Content>
        </Modal>
    );
};

export default forwardRef(ModalComponent);

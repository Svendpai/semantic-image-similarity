import { Box } from 'native-base';
import { colors } from '../Atoms/Colors';
import ContainerCenteringContent from '../Atoms/ContainerCenteringContent';
import IconButton from './IconButton';

const CameraButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
    return (
        <ContainerCenteringContent width={'auto'} height={'auto'}>
            <Box
                padding='1'
                alignItems='center'
                justifyContent='center'
                borderWidth='3'
                borderColor={colors['white']}
                borderRadius={'full'}
            >
                <IconButton
                    iconSize='medium'
                    icon='image'
                    iconColor='white'
                    color='dark'
                    height='large'
                    borderRadius='full'
                    onPress={onPress}
                />
            </Box>
        </ContainerCenteringContent>
    );
};

export default CameraButton;

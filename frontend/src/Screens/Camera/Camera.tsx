import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Camera as CameraView } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Box, Center, IBoxProps } from 'native-base';
import { Overlay } from 'native-base/lib/typescript/components/primitives';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ImageBackgroundBase,
    Platform,
    Pressable,
    Text,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-native';
import {
    setDocumentationImage,
    setInstructionImage,
} from '../../Redux/Slices/templateSlice';
import { RootState } from '../../Redux/store';
import TensorCamera from './TensorCamera';

//import { setMedia } from '../../features/media/media-slice';

type CameraProps = {};

const Camera: React.FC<CameraProps> = ({}) => {
    const windowWidth = Dimensions.get('window').width;
    const [hasPermission, setHasPermission] = useState(false);
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
    const [liveMode, setLiveMode] = useState<boolean>(false);

    const [recording, setRecording] = useState<boolean>(false);
    const [cameraReady, setCameraReady] = useState<boolean>();
    const [galleryItems, setGalleryItems] = useState<MediaLibrary.Asset[]>([]);
    const [type, setType] = useState<CameraType>(
        CameraView.Constants.Type.front
    );
    const [isFocused, setIsFocused] = useState<boolean>(true);
    const [flashMode, setFlashMode] = useState(
        CameraView.Constants.FlashMode.auto
    );
    let { mode } = useParams();
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.counter);

    const camera = useRef<any>(null);

    const navigate = useNavigate();
    const boxRef = useRef<IBoxProps>(null);
    const setCameraFacing = async (): Promise<'front' | 'back' | undefined> => {
        if (Platform.OS === 'web') {
            const types = await CameraView.getAvailableCameraTypesAsync();
            if (types.includes('front')) {
                return 'front';
            } else if (types.includes('back')) {
                return 'back';
            }
        } else {
            return 'back';
        }
    };
    const setFlash = () => {
        if (Platform.OS !== 'web')
            setFlashMode(CameraView.Constants.FlashMode.off);
    };

    const openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        setIsFocused(false);
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled) {
        } else {
            if (mode == 'instruction') {
                dispatch(setInstructionImage(pickerResult.uri));
            } else if (mode == 'documentation') {
                dispatch(setDocumentationImage(pickerResult.uri));
            }
            navigate('/');
            setIsFocused(true);
        }
        setIsFocused(true);
    };

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
    };

    useEffect(() => {
        (async () => {
            const { granted } =
                await CameraView.requestCameraPermissionsAsync();
            if (Platform.OS !== 'web') {
                let permissionResult =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
            }

            setHasPermission(granted);
            if (!granted) navigate('/');

            const galleryStatus =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermissions(galleryStatus.status == 'granted');

            setCameraFacing().then((res) => {
                if (res && res === 'back')
                    setType(CameraView.Constants.Type.back);
                else if (res && res === 'front')
                    setType(CameraView.Constants.Type.front);
            });

            setFlash();
            // if (Platform.OS !== "web") {
            //     if (galleryStatus.status == "granted") {
            //         const userGalleryMedia = await MediaLibrary.getAssetsAsync({
            //             sortBy: ["creationTime"],
            //             mediaType: ["video"],
            //         });
            //         setGalleryItems(userGalleryMedia.assets);
            //     }
            // }
        })();
    }, []);

    if (hasPermission === null || hasGalleryPermissions === null) {
        return <View />;
    }
    if (hasPermission === false || hasGalleryPermissions === false) {
        return <Text>No access to camera</Text>;
    }

    const rotateCamera = () => {
        setType(
            type === CameraView.Constants.Type.back
                ? CameraView.Constants.Type.front
                : CameraView.Constants.Type.back
        );
    };

    const toggleFlash = () => {
        setFlashMode(
            flashMode === CameraView.Constants.FlashMode.off
                ? CameraView.Constants.FlashMode.torch
                : CameraView.Constants.FlashMode.off
        );
    };

    const takePicture = async () => {
        const picture = await camera.current.takePictureAsync();

        if (mode == 'instruction') {
            dispatch(setInstructionImage(picture.uri));
        } else if (mode == 'documentation') {
            dispatch(setDocumentationImage(picture.uri));
        }
        navigate('/');
    };

    const getWidth = (): number => {
        if (boxRef.current) {
            return boxRef.current.width as number;
        }
        return windowWidth;
    };

    return (
        <>
            {isFocused && (
                <Center
                    width={'100%'}
                    h={'full'}
                    safeArea
                    backgroundColor={'black'}
                >
                    <Box
                        testID='wrapper'
                        w={'full'}
                        maxW='420'
                        h='full'
                        flexDirection={'column'}
                        ref={boxRef}
                    >
                        <Box
                            testID='header'
                            height={'60px'}
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                        >
                            <Pressable
                                testID='arrowBack'
                                onPress={() => {
                                    navigate('/');
                                }}
                            >
                                <Box
                                    ml={3}
                                    mt={2}
                                    justifyContent={'center'}
                                    alignContent={'center'}
                                >
                                    <Ionicons
                                        name='arrow-back'
                                        size={40}
                                        color='white'
                                    />
                                </Box>
                            </Pressable>
                            {Platform.OS !== 'android' && (
                                <Pressable
                                    testID='liveMode'
                                    onPress={() => {
                                        setLiveMode(!liveMode);
                                    }}
                                >
                                    <Box
                                        ml={3}
                                        mt={2}
                                        justifyContent={'center'}
                                        alignContent={'center'}
                                    >
                                        <Ionicons
                                            name='analytics-outline'
                                            size={40}
                                            color='white'
                                        />
                                    </Box>
                                </Pressable>
                            )}
                            {Platform.OS !== 'web' &&
                                type === CameraView.Constants.Type.back && (
                                    <Pressable
                                        testID='light'
                                        onPress={toggleFlash}
                                    >
                                        <Box
                                            mr={3}
                                            mt={2}
                                            justifyContent='center'
                                            alignContent={'center'}
                                        >
                                            <Ionicons
                                                name={
                                                    flashMode ===
                                                    CameraView.Constants
                                                        .FlashMode.off
                                                        ? 'ios-flash'
                                                        : 'ios-flash-off'
                                                }
                                                color='white'
                                                size={40}
                                            />
                                        </Box>
                                    </Pressable>
                                )}
                        </Box>
                        <Box testID='camera' flex={1}>
                            {liveMode ? (
                                <TensorCamera
                                    cameraRef={camera}
                                    width={getWidth()}
                                    height={getWidth()}
                                    type={type}
                                    flashMode={flashMode}
                                />
                            ) : (
                                <CameraView
                                    ratio='4:3'
                                    ref={camera}
                                    style={{
                                        aspectRatio: 1 / (4 / 3),
                                        width: getWidth(),
                                        height: getWidth(),
                                        // aspectRatio: 1 / (4 / 3),
                                        // width: getWidth(),
                                        // height: getWidth() * 1.333
                                        // opacity:
                                        //     mode == 'instruction' &&
                                        //     count.documentationImageUri
                                        //         ? 0.7
                                        //         : 1,
                                    }}
                                    onCameraReady={() => setCameraReady(true)}
                                    type={type}
                                    flashMode={flashMode}
                                ></CameraView>
                            )}
                        </Box>
                        <Box
                            testID='footer'
                            height={'144px'}
                            backgroundColor={'black'}
                        >
                            <Box
                                testID='mediaType'
                                height={'34px'}
                                flexDirection={'row'}
                                justifyContent={'space-evenly'}
                            >
                                <Box
                                    testID='photo'
                                    flexDirection={'row'}
                                    style={{ alignItems: 'center' }}
                                >
                                    <Ionicons
                                        name='image-outline'
                                        size={20}
                                        color='white'
                                    />
                                    <Text
                                        style={{
                                            color: 'white',
                                            marginLeft: 5,
                                        }}
                                    >
                                        {mode?.toLocaleUpperCase()}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'white',
                                            marginLeft: 5,
                                        }}
                                    >
                                        {liveMode ? 'Live Mode' : null}
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                testID='mediaType'
                                height={'86px'}
                                flexDirection='row'
                                justifyContent={'space-evenly'}
                                alignItems={'center'}
                            >
                                <Box
                                    testID='file'
                                    h={'42px'}
                                    w={'42px'}
                                    {...boxAlignCenter}
                                    {...boxBorderRadius}
                                    backgroundColor={'danger.900'}
                                >
                                    {/* "#262626"  */}
                                    {Platform.OS !== 'web' && (
                                        <Pressable
                                            onPress={() => {
                                                openImagePickerAsync();
                                                //pickFromGallery();
                                                return;
                                            }}
                                        >
                                            <FontAwesome
                                                name='folder-o'
                                                size={20}
                                                color='white'
                                            />
                                        </Pressable>
                                    )}
                                </Box>
                                <Box
                                    testID='record'
                                    height={'86px'}
                                    width={'86px'}
                                    {...boxAlignCenter}
                                    {...boxBorderRadius}
                                >
                                    <Box
                                        testID='recordButton'
                                        height={'62px'}
                                        width={'62px'}
                                        {...boxAlignCenter}
                                        {...boxBorderRadius}
                                        borderColor='white'
                                    >
                                        <Box
                                            testID='icon'
                                            {...boxAlignCenter}
                                            backgroundColor={'#FF385C'}
                                            borderRadius={1000}
                                            borderWidth={1}
                                            p={2}
                                        >
                                            <Pressable
                                                disabled={!cameraReady}
                                                onPress={() => takePicture()}
                                            >
                                                <Ionicons
                                                    name={
                                                        recording
                                                            ? 'stop'
                                                            : 'image-outline'
                                                    }
                                                    size={24}
                                                    color={
                                                        cameraReady
                                                            ? 'white'
                                                            : 'black'
                                                    }
                                                />
                                            </Pressable>
                                        </Box>
                                    </Box>
                                </Box>
                                {Platform.OS !== 'web' && (
                                    <Pressable onPress={() => rotateCamera()}>
                                        <Box
                                            testID='flip'
                                            h={'42px'}
                                            w={'42px'}
                                            {...boxAlignCenter}
                                            {...boxBorderRadius}
                                            backgroundColor={'#262626'}
                                        >
                                            <Ionicons
                                                name='camera-reverse-outline'
                                                size={20}
                                                color='white'
                                            />
                                        </Box>
                                    </Pressable>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Center>
            )}
        </>
    );
};

const boxBorderRadius = {
    borderWidth: '4px',
    borderRadius: '1000px',
};
const boxAlignCenter = {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
};

export default Camera;

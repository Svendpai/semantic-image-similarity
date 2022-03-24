import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Camera as CameraView } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Box, Center, IBoxProps } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, Pressable, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';

//import { setMedia } from '../../features/media/media-slice';

type CameraProps = {};

const Camera: React.FC<CameraProps> = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const [hasPermission, setHasPermission] = useState(false);
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
    const [recording, setRecording] = useState<boolean>(false);
    const [cameraReady, setCameraReady] = useState<boolean>();
    const [galleryItems, setGalleryItems] = useState<MediaLibrary.Asset[]>([]);
    const [type, setType] = useState<CameraType>(
        CameraView.Constants.Type.front
    );
    const [flashMode, setFlashMode] = useState(
        CameraView.Constants.FlashMode.auto
    );

    const camera = useRef<CameraView | any>(null);

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

    useEffect(() => {
        (async () => {
            const { status } = await CameraView.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');

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

    const openMediaEditor = (uri: string, type: 'image' | 'video') => {
        //console.log(uri, type);
        //dispatch(setMedia({ uri, type }));
        //props.setMedia({ uri, type });
        //props.navigation.navigate('media_editor');
    };

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

    const startRecording = async () => {
        try {
            setRecording(true);
            const video = await camera.current.recordAsync({
                maxDuration: 60,
                quality: CameraView.Constants.VideoQuality['720p'],
                videoBitrate: 4 * 1000 * 1000,
            });

            //set local uri, and set the uploadFilePath on the card object + _output.mp4 (the final transcoded file is stored as <uploadFilePath>

            //so with this url, we can get a download link with getDownloadURL, which is exported by the useFireStorage hook
            openMediaEditor(video.uri, 'video');
        } catch (error) {
            console.log(error);
        }
    };

    const stopRecording = () => {
        setRecording(false);
        if (Platform.OS !== 'web') {
            camera.current.stopRecording();
        }
    };

    const takePicture = async () => {
        const picture = await camera.current.takePictureAsync();

        openMediaEditor(picture.uri, 'image');
    };

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
    };

    const getWidth = (): number => {
        if (boxRef.current) {
            return boxRef.current.width as number;
        }
        return windowWidth;
    };

    return (
        <>
            <Center width={'100%'} h={'full'} safeArea>
                <Box
                    testID='wrapper'
                    w={'full'}
                    maxW='420'
                    h='full'
                    backgroundColor={'black'}
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
                            testID='backArrow'
                            onPress={() => {
                                navigate("/")
                            }}
                        >
                            <Box
                                ml={3}
                                mt={2}
                                justifyContent={'center'}
                                alignContent={'center'}
                            >
                                <Ionicons
                                    name='arrow-back-outline'
                                    size={40}
                                    color='white'
                                />
                            </Box>
                        </Pressable>
                        {Platform.OS !== 'web' &&
                            type === CameraView.Constants.Type.back && (
                                <Pressable testID='light' onPress={toggleFlash}>
                                    <Box
                                        mr={3}
                                        mt={2}
                                        justifyContent='center'
                                        alignContent={'center'}
                                    >
                                        <Ionicons
                                            name={
                                                flashMode ===
                                                CameraView.Constants.FlashMode
                                                    .off
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
                        <CameraView
                            ratio='4:3'
                            ref={camera}
                            style={{
                                aspectRatio: 1 / (4 / 3),
                                width: getWidth(),
                                height: getWidth() * 1.333,
                            }}
                            onCameraReady={() => setCameraReady(true)}
                            type={type}
                            flashMode={flashMode}
                        ></CameraView>
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
                                style={selected}
                            >
                                <Ionicons
                                    name='image-outline'
                                    size={20}
                                    color='white'
                                />
                                <Text style={{ color: 'white', marginLeft: 5 }}>
                                    Documentation
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
                                <Pressable
                                    onPress={() => {
                                        console.log(
                                            'File upload is not implemented yet'
                                        );
                                    }}
                                >
                                    <FontAwesome
                                        name='folder-o'
                                        size={20}
                                        color='white'
                                    />
                                </Pressable>
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
                                            onLongPress={() => startRecording()}
                                            onPress={() =>
                                                recording
                                                    ? stopRecording()
                                                    : takePicture()
                                            }
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
                        </Box>
                    </Box>
                </Box>
            </Center>
        </>
    );
};

const selected = {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
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

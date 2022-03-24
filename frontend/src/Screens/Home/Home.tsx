import React from 'react';
import { RootState } from '../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../Redux/Slices/templateSlice';
import { Button, View } from 'native-base';
import { useNavigate } from 'react-router-native';
import { Text } from 'react-native';

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <>
            <View>
                <Text>HOME</Text>
            </View>
            <Button
                onPress={() => {
                    navigate('/camera');
                }}
            >
                GO TO CAMERA
            </Button>
        </>
    );
};
export default Home;

import * as React from 'react';
import { useCallback, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
import { useFocusEffect } from "@react-navigation/native";
import { AxiosContext } from '../../../context/AxiosContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const dialogStyles = {
    width: screenWidth * 0.5,
    height: screenHeight * 0.5,
};
const MyComponent = (props) => {
    const { onClose, visible, data } = props
    console.log(data)
    const { authAxios } = useContext(AxiosContext);
    const getMyEvents = async () => {
        return []
    }
    useFocusEffect(
        useCallback(() => {
            getMyEvents()
                .then()
                .catch((e) => console.error(e));
        }, [])
    );

    return (
        <Provider>
            <View >
                <Portal>
                    <Dialog styles={dialogStyles} visible={visible} onDismiss={onClose}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onClose}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};


export default MyComponent;
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const dialogStyles = {
    width: screenWidth * 0.5,
    height: screenHeight * 0.5,
};
const MyComponent = (props) => {
    const { onClose, visible } = props

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
import * as React from 'react';
import { useCallback, useContext, useState } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { List, Button, Dialog, Portal, Provider, Text, TextInput, Avatar } from 'react-native-paper';
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
    const { authAxios } = useContext(AxiosContext);
    const [myEvents, setMyEvents] = useState([]);
    const [expandEvent, setExpandEvent] = useState(false)
    const [desiredEvent, setDesiredEvent] = useState("")
    const [desiredEventId, setDesiredEventId] = useState()
    const [description, setDescription] = useState("");
    const [bookingError, setBookingError] = useState("")

    const getMyEvents = async () => {
        const response = await authAxios.get("/events");
        const { data } = response;
        const { my_events = [] } = data;
        setMyEvents(my_events)
        return
    }

    const sendBookingRequest = async () => {
        const { businessId, packageId } = data
        const bookingData = {
            businessId,
            packageId,
            desiredEventId,
            description
        };

        return authAxios.post("/requests", bookingData);
    }

    const onBookingPress = async () => {
        try {
            await sendBookingRequest()
            closeWrapper()
        } catch (error) {
            console.log(error, error.response.status, error.response.status === 409)
            if (error.response.status === 409) {
                setBookingError("Booking already exists")
            } else {
                setBookingError("Booking Error")
            }

        }
    }

    const closeWrapper = ()=>{
        setBookingError("")
        onClose()
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
                        <Dialog.Title>Booking infromation</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Notes"
                                value={description}
                                onChangeText={text => setDescription(text)}
                            />
                            <View style={{ height: 200 }}>
                                <List.Section>
                                    <ScrollView style={{ maxHeight: 150 }}>
                                        <List.Accordion
                                            title={desiredEvent ? desiredEvent : 'Choose an event'}
                                            style={{ width: 250, maxWidth: screenWidth }}
                                            titleStyle={{ fontSize: 12 }}
                                            expanded={expandEvent}
                                            onPress={() => {
                                                setExpandEvent(!expandEvent)
                                            }}
                                        >
                                            {myEvents.map((option) => {
                                                return (
                                                    <List.Item
                                                        title={`${option.name} ${option.event_date}`}
                                                        key={option.name}
                                                        onPress={() => {
                                                            setDesiredEventId(option.id)
                                                            setDesiredEvent(`${option.name} ${option.event_date}`)
                                                            setExpandEvent(!expandEvent)
                                                        }}
                                                    />
                                                )
                                            })}
                                        </List.Accordion>
                                    </ScrollView>
                                </List.Section>
                            </View>
                            {bookingError ? <Text variant="bodyMedium">{bookingError}</Text> : null}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onBookingPress}>Book</Button>
                            <Button onPress={closeWrapper}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};


export default MyComponent;
import React, { useState, useEffect, useContext } from 'react'
import { AxiosContext } from '../../../context/AxiosContext'
import { StyleSheet, Dimensions, View, SafeAreaView, FlatList } from 'react-native'
import { Button, Card, Text, } from 'react-native-paper'


const screenHeight = Dimensions.get('window').height


export default function NotificationScreen() {
  const { authAxios } = useContext(AxiosContext)
  const [notificationList, setNotificationList] = useState([])

  const fetchNotifications = async () => {
    const resp = await authAxios.get(`/request-notifs`)
    const { data } = resp
    const { notification = [] } = data
    setNotificationList(notification)
  }

  useEffect(() => {
    fetchNotifications().then().catch((e) => console.log(e))
  }, [])

  const renderSearchItem = ({ item }) => {
    const { id, event_name: eventName, event_date: eventDate, address } = item
    return (
      <View style={styles.searchResultWrapper}>
        <Card mode='outlined'>
          <Card.Title title={eventName} subtitle={address} />
          <Card.Content>
            <Text variant="bodyMedium">Date: {eventDate}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log("ACK")}>Ack</Button>
          </Card.Actions>
        </Card>
      </View>

    )
  }

  return (
    <View style={{ height: screenHeight * 0.75, paddingBottom: 20 }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={notificationList}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>

  )


}

const styles = StyleSheet.create({
  searchResultWrapper: {
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  resultText: {
    fontSize: 14,
    fontWeight: 'bold',
    // padding: 4,
  },
  parentFilter: {
    flexDirection: 'row',
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  }
})

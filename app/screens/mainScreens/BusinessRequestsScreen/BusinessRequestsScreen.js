import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import { Card, Button, Avatar } from "react-native-paper";
import { categoryIcons } from "../../../utils/category-icons";

const BusinessRequestsScreen = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [requestsList, setRequestsList] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("pending");

  const getRequests = async () => {
    try {
      const response = await authAxios.get("/requests");
      const { requests = [] } = response.data;
      setRequestsList(requests);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async (
    id,
    event_user_id,
    is_acknowledged,
    request_status
  ) => {
    const data = {
      is_acknowledged,
      request_status,
      id,
      event_user_id,
    };
    const response = await authAxios.put("/requests", data);
  };
  const handleDecline = async (
    id,
    event_user_id,
    is_acknowledged,
    request_status
  ) => {
    const data = {
      is_acknowledged,
      request_status,
      id,
      event_user_id,
    };
    const response = await authAxios.put("/requests", data);
    const updatedStatus = response.data.request_status;
    setCurrentStatus(updatedStatus);
  };

  useEffect(() => {
    getRequests()
      .then()
      .catch((e) => console.error(e));
  }, []);

  const renderItems = ({ item }) => {
    const {
      id,
      event_user_id,
      package_id,
      event_id,
      description,
      request_status,
      event_name,
      event_date,
      event_category,
      event_address,
    } = item;
    return (
      <View>
        <Card style={styles.cardContainer}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{event_name}</Text>
              <Text style={styles.cardSubtitle}>{event_category}</Text>
              <Card.Title
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon={categoryIcons[`${event_category}`]?.icon|| 'calendar-star'}
                    color={"white"}
                    style={{
                      backgroundColor: categoryIcons[`${event_category}`]?.color || 'blue',
                      marginTop: -35,
                    }}
                  />
                )}
              />
            </View>
            <View>
              <View style={styles.hostMessageContainer}>
                <Text style={styles.hostMessageTitle}>Host Message:</Text>
                <Text style={styles.hostMessage}>{description}</Text>
              </View>
              <View style={styles.cardDetailContainer}>
                <View style={styles.cardDetail}>
                  <Text style={styles.cardDetailLabel}>Date:</Text>
                  <Text style={styles.cardDetailText}>{event_date}</Text>
                </View>
                <View style={styles.cardDetail}>
                  <Text style={styles.cardDetailLabel}>Address:</Text>
                  <Text style={styles.cardDetailText}>{event_address}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
          <Card.Actions style={styles.statusButtons}>
            {currentStatus === "pending" ? (
              <View style={styles.statusButtons}>
                <Button
                  icon="check"
                  color={"green"}
                  onPress={() => {
                    setCurrentStatus("accepted");
                    handleConfirm(id, event_user_id, true, 1);
                  }}
                >
                  Confirm
                </Button>
                <Button
                  icon={"cancel"}
                  color={"red"}
                  onPress={() => {
                    setCurrentStatus("declined");
                    handleDecline(id, event_user_id, true, 0);
                  }}
                >
                  Decline
                </Button>
              </View>
            ) : currentStatus === "accepted" ? (
              <Text style={{ color: "green", fontWeight: "bold" }}>
                ACCEPTED
              </Text>
            ) : (
              <Text style={{ color: "red", fontWeight: "bold" }}>DECLINED</Text>
            )}
          </Card.Actions>
        </Card>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        style={{ width: "100%" }}
        data={requestsList}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
  },
  cardContainer: {
    marginTop:7,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    minWidth: "50%",
  },
  cardHeader: {
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },
  cardSubtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 6,
  },
  hostMessageContainer: {
    marginBottom: 10,
    marginTop: -25,
  },
  hostMessageTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  hostMessage: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    paddingVertical: 5,
  },

  cardDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetail: {
    flex: 1,
    marginRight: 10,
    fontWeight: "bold",
  },
  cardDetailLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDetailText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#666",
  },
  statusButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default BusinessRequestsScreen;

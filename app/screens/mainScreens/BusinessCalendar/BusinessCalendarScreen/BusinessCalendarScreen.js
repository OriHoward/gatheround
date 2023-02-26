import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import { Card, FAB, IconButton, Avatar, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { AxiosContext } from "../../../../context/AxiosContext";
import { getBackendDateFormat } from "../../../../utils/datetime-utils";
import { useFocusEffect } from "@react-navigation/native";
import { categoryIcons } from "../../../../utils/category-icons";
import { CardStyles, EventCardStyles } from "../../../../CommonStyles";

const BusinessCalendarScreen = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);

  const [open, setOpen] = useState(false); // FAB Group
  const [dates, setDates] = useState([]); // DatePickerModal (array of dates)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // DatePickerModal
  const [data, setData] = useState([]);

  const onDismiss = () => setDatePickerVisible(false);
  const onConfirm = async (selectedDates) => {
    try {
      const { dates } = selectedDates;
      setDates(dates);
      const unavailableDatesData = [];
      dates.forEach((element) => {
        unavailableDatesData.push({
          date: getBackendDateFormat(element),
          category: "Unavailable",
          description: "",
        });
      });
      const response = await authAxios.post(
        "/booked-dates",
        unavailableDatesData
      );
    } catch (e) {
      console.error(e);
    }
    setDatePickerVisible(false);
  };

  const getCalendarEvents = async () => {
    try {
      const response = await authAxios.get("/booked-dates");
      const calendarData = [];
      const unavailableDates = [];
      response.data.forEach((element) => {
        if (element.category === "Unavailable") {
          const [day, month, year] = element.date.split("/");
          const formattedDate = `${year}-${month}-${day}`;
          unavailableDates.push(new Date(formattedDate));
          calendarData.push({
            ...element,
            dateObject: new Date(formattedDate),
          });
        }
      });
      setDates(unavailableDates);

      const acceptedEvents = await authAxios.get(
        "/requests?accepted-only=True"
      );
      const { requests = [] } = acceptedEvents.data;
      requests.forEach((element) => {
        const {
          id,
          description,
          event_name: name,
          event_date,
          event_category: category,
          event_address: address,
        } = element;
        const [date, time] = event_date.split(" ");
        const [day, month, year] = date.split("/");
        const formattedDate = `${year}-${month}-${day}T${time}`;
        calendarData.push({
          id,
          description,
          name,
          date,
          time,
          category,
          address,
          dateObject: new Date(formattedDate),
        });
      });

      calendarData.sort((a, b) => {
        return a.dateObject - b.dateObject;
      });

      setData(calendarData);
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCalendarEvents()
        .then()
        .catch((e) => console.error(e));
    }, [isDatePickerVisible]) // refreshes data after closing the date picker modal
  );

  const LeftContent = (props) => <Avatar.Icon {...props} icon="close" />;
  const RightContent = (props) => (
    <IconButton {...props} icon="chevron-right" disabled={true} />
  );

  const renderItem = ({ item }) => {
    if (item.category === "Unavailable") {
      const { id, date, category, description } = item;
      return (
        <Card
          mode="outlined"
          style={styles.cardContainer}
          key={id}
          onPress={() =>
            navigation.navigate("Details", {
              id,
              date,
              category,
              description,
            })
          }
        >
          <Card.Title
            title={date}
            subtitle={category}
            left={LeftContent}
            right={RightContent}
          />
        </Card>
      );
    } else {
      const { id, description, name, date, time, category, address } = item;
      return (
        <Card
          style={CardStyles.cardContainer}
          mode="outlined"
          key={id}
          onPress={() =>
            navigation.navigate("Details", {
              id,
              description,
              name,
              date,
              time,
              category,
              address,
            })
          }
        >
          <Card.Title
            title={name}
            subtitle={address}
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon={categoryIcons[`${category}`]?.icon || "calendar-star"}
                color={"white"}
                style={{
                  backgroundColor:
                    categoryIcons[`${category}`]?.color || "blueviolet",
                }}
              />
            )}
            right={RightContent}
          />
          <Card.Content>
            <View style={{ flexDirection: "row" }}>
              <Text style={EventCardStyles.header2_date}>{date}</Text>
              <Text style={EventCardStyles.header2_time}>{`, ${time}`}</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <FlatList data={data} renderItem={renderItem} />
      </View>
      <DatePickerModal
        visible={isDatePickerVisible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        validRange={{ startDate: new Date() }}
        dates={dates}
        label="Select Dates"
        saveLabel="Save"
        mode="multiple"
        uppercase={false}
      />
      <FAB.Group
        open={open}
        visible
        icon="plus"
        actions={[
          {
            icon: "calendar-minus",
            label: "Select Unavailable Dates",
            onPress: () => setDatePickerVisible(true),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
  },
  buttons: {
    alignContent: "space-between",
    flexDirection: "row",
  },
  filterButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingEnd: 20,
  },
  filterButtonLabel: { fontWeight: "bold" },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardContainer: {
    flex: 1,
    borderRadius: 15,
    marginBottom: 10,
  },
});

export default BusinessCalendarScreen;

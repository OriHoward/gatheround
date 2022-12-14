import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import { Card, FAB, IconButton, Avatar } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { AxiosContext } from "../../../../context/AxiosContext";
import { getBackendDateFormat } from "../../../../utils/datetime-utils";
import { useFocusEffect } from "@react-navigation/native";

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
      // todo: delete dates that were unselected in date picker state
      const unavailableDates = [];
      response.data.forEach((element) => {
        if (element.category === "Unavailable") {
          const [day, month, year] = element.date.split("/");
          const formattedDate = `${year}-${month}-${day}`;
          unavailableDates.push(new Date(formattedDate));
        }
      });
      setDates(unavailableDates);
      setData(response.data);
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

  const peachColor = "#FF7F50";
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  const RightContent = (props) => (
    <IconButton {...props} icon="chevron-right" disabled={true} />
  );

  const renderItem = ({ item }) => {
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
  };

  return (
    <View style={styles.root}>
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
      <View>
        <FlatList data={data} renderItem={renderItem} />
      </View>
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
    alignSelf: "center",
    // width: 500,
    // flex: 1,
    borderRadius: 15,
  },
});

export default BusinessCalendarScreen;

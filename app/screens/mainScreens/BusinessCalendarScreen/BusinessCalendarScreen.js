import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import {
  Button,
  Divider,
  FAB,
  Menu,
  Provider,
  RadioButton,
} from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

const BusinessCalendarScreen = () => {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isUnavailableDatesVisible, setUnavailableDatesVisibility] =
    useState(false);
  const [dateFilterValue, setDateFilterValue] = useState("first");

  const onDismiss = () => setDatePickerVisible(false);
  const onConfirm = (selectedDates) => {
    const { dates } = selectedDates;
    setDates(dates);
    setDatePickerVisible(false);
  };

  const peachColor = "#FF7F50";

  return (
    <Provider>
      <View style={styles.root}>
        <SectionTitle title="My Calendar" />
        <SafeAreaView style={styles.menuContainer}>
          <Menu
            visible={isMenuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                onPress={() => setMenuVisible(true)}
                uppercase={false}
                color={"black"}
                labelStyle={styles.filterButtonLabel}
                style={styles.filterButton}
              >
                Filter
              </Button>
            }
          >
            <Menu.Item
              title={
                isUnavailableDatesVisible
                  ? "Hide Unavailable Dates"
                  : "Show Unavailable Dates"
              }
              onPress={() =>
                setUnavailableDatesVisibility(!isUnavailableDatesVisible)
              }
            />
            {isUnavailableDatesVisible ? (
              <>
                <Divider />
                <RadioButton.Group
                  onValueChange={(value) => setDateFilterValue(value)}
                  value={dateFilterValue}
                >
                  <RadioButton.Item label="Week" value="first" />
                  <RadioButton.Item label="Month" value="second" />
                  <RadioButton.Item label="6 Months" value="third" />
                  <RadioButton.Item label="Year" value="fourth" />
                </RadioButton.Group>
              </>
            ) : (
              <></>
            )}
          </Menu>
        </SafeAreaView>
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
    </Provider>
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
});

export default BusinessCalendarScreen;

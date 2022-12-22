import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { FAB } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

const BusinessCalendarScreen = () => {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const onDismiss = () => setDatePickerVisible(false);
  const onConfirm = (selectedDates) => {
    const { dates } = selectedDates;
    setDates(dates);
    setDatePickerVisible(false);
  };

  const peachColor = "#FF7F50";

  return (
    <View style={styles.root}>
      <SectionTitle title="My Calendar" />
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
});

export default BusinessCalendarScreen;

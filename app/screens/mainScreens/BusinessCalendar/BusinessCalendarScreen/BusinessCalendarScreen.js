import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import {
  Button,
  Card,
  Divider,
  FAB,
  IconButton,
  Menu,
  Provider,
  RadioButton,
  Title,
  Paragraph,
  Avatar,
} from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

const BusinessCalendarScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false); // FAB Group
  const [dates, setDates] = useState([]); // DatePickerModal
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // DatePickerModal
  const [isMenuVisible, setMenuVisible] = useState(false); // Menu
  const [isUnavailableDatesVisible, setUnavailableDatesVisibility] =
    useState(false); // Menu Item
  const [dateFilterValue, setDateFilterValue] = useState("first"); // RadioButton.Group
  const [isDetailsPressed, setDetailsPressed] = useState(false); //
  const [data, setData] = useState({
    unavailable: [{ date: "25/12/2022", details: { description: "Babi" } }],
  });

  const onDismiss = () => setDatePickerVisible(false);
  const onConfirm = (selectedDates) => {
    const { dates } = selectedDates;
    setDates(dates);
    setDatePickerVisible(false);
  };

  const peachColor = "#FF7F50";
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  const RightContent = (props) => (
    <IconButton
      {...props}
      icon={isDetailsPressed ? "menu-up" : "menu-down"}
      onPress={() => {
        setDetailsPressed(!isDetailsPressed);
        navigation.navigate("Details", { data });
      }}
    />
  );

  return (
    <Provider>
      <View style={styles.root}>
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
        <Card
          mode="outlined"
          style={{ alignSelf: "center", width: 500, borderRadius: 15 }}
        >
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
            right={RightContent}
          />
          {/* {isDetailsPressed ? (
            <>
              <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </>
          ) : (
            <></>
          )} */}
        </Card>
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

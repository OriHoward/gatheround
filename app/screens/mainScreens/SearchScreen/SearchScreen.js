import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import {
  List,
  Button,
  Card,
  Text,
  Avatar,
  TouchableRipple,
  IconButton,
  Title,
  Paragraph,
} from "react-native-paper";
import BookingDialog from "../BookingDialog";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SearchScreen = () => {
  const [dataToDisplay, setDataToDispay] = useState([]);
  const { authAxios } = useContext(AxiosContext);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableProfessions, setAvailableProfessions] = useState([]);
  const [city, setCity] = useState("");
  const [desiredProfession, setDesiredProfession] = useState("");
  const [priceOrdering, setPriceOrdering] = useState("asc");
  const [expandCity, setExpandCity] = useState(false);
  const [expandProfession, setExpandProfession] = useState(false);
  const [expandOrder, setExpandOrder] = useState(false);
  const [visibleBookDialog, setvisibleBookDialog] = useState(false);
  const [bookingData, setBookingData] = useState({});

  const fetchDistinctValues = async () => {
    const resp = await authAxios.get(`/business-search-meta`);
    const { data } = resp;
    const { distinctCities = [], distinctProfessions = [] } = data;
    setAvailableCities(distinctCities);
    setAvailableProfessions(distinctProfessions);
  };

  /*
	This function sends a get request to recieve all the business profiles that match the search query.
  */

  const onSearchClick = async () => {
    try {
      const searchObj = { city, desiredProfession, priceOrdering };
      let queryParamsArray = Object.keys(searchObj)
        .filter((itemKey) => searchObj[itemKey])
        .map((key) => `${key}=${searchObj[key]}`);
      let searchQueryString = queryParamsArray.length
        ? `?${queryParamsArray.join("&")}`
        : "";
      const resp = await authAxios.get(`/business-search${searchQueryString}`);
      const { data } = resp;
      const { results = [] } = data;
      setDataToDispay(results);
    } catch (error) {
      console.error(error);
      setDataToDispay([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDistinctValues().catch((e) => console.error(e));
      onSearchClick()
        .then()
        .catch((e) => console.error(e));
    }, [])
  );

  const onBookClick = (dataForBooking) => {
    setBookingData(dataForBooking);
    setvisibleBookDialog(true);
  };

  const closeDialog = () => {
    setvisibleBookDialog(false);
    setBookingData({});
  };

  const cleanData = () => {
    setDataToDispay([]);
    setCity("");
    setDesiredProfession("");
    setPriceOrdering("asc");
  };

  const renderSearchItem = ({ item }) => {
    const {
      business_id: businessId,
      package_id: packageId,
      profession,
      country,
      city,
      phone_number,
      price,
      currency,
      package_name,
      description,
    } = item;
    return (
      <View style={styles.searchResultWrapper}>
        <Card mode="outlined">
          <Card.Content>
            <Title>{package_name}</Title>
            <Paragraph>{description}</Paragraph>
            <View style={styles.cardView}>
              <IconButton
                icon="city"
                size={20}
                color="#000"
                style={{ marginRight: 10 }}
              />
              <Text variant="bodyMedium">{city}</Text>
              <IconButton
                icon="earth"
                size={20}
                color="#000"
                style={{ marginRight: 10 }}
              />
              <Text variant="bodyMedium">{country}</Text>
            </View>
            <View style={styles.cardView}></View>
            <View style={styles.cardView}>
              <IconButton
                icon="briefcase"
                size={20}
                color="#000"
                style={{ marginRight: 10 }}
              />
              <Text variant="bodyMedium">{profession}</Text>
            </View>
            <View style={styles.cardView}>
              <IconButton
                icon="cash"
                size={20}
                color="#000"
                style={{ marginRight: 10 }}
              />
              <Text variant="bodyMedium">{price}</Text>
            </View>
            <View style={styles.cardView}>
              <IconButton
                icon="currency-usd"
                size={20}
                color="#000"
                style={{ marginRight: 10 }}
              />
              <Text variant="bodyMedium">{currency}</Text>
            </View>
            <View style={styles.cardView}>
              <IconButton
                icon="phone"
                size={20}
                color="#000"
                style={{ marginRight: 10 }}
              />
              <Text variant="bodyMedium">{phone_number}</Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => onBookClick({ businessId, packageId })}>
              Book Service
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };
  const getListItems =
    (expandVal) => (availableOptions, setFunc, setExpander) => {
      return availableOptions.map((option) => {
        return (
          <List.Item
            title={option}
            key={option}
            onPress={() => {
              setFunc(option);
              setExpander(!expandVal);
            }}
          />
        );
      });
    };
  return (
    <View style={styles.root}>
      <View>
        <View style={styles.parentFilter}>
          <View style={{ height: 150 }}>
            <List.Section>
              <ScrollView style={{ maxHeight: 150 }}>
                <List.Accordion
                  title={city ? `${city}` : "City"}
                  style={styles.dropDown}
                  titleStyle={{ fontSize: 12 }}
                  expanded={expandCity}
                  onPress={() => {
                    setExpandCity(!expandCity);
                  }}
                >
                  {getListItems(expandCity)(
                    availableCities,
                    setCity,
                    setExpandCity
                  )}
                </List.Accordion>
              </ScrollView>
            </List.Section>
          </View>
          <View style={{ height: 150 }}>
            <List.Section>
              <ScrollView style={{ maxHeight: 150 }}>
                <List.Accordion
                  title={
                    desiredProfession ? `${desiredProfession}` : "Profession"
                  }
                  style={styles.dropDown}
                  titleStyle={{ fontSize: 12 }}
                  expanded={expandProfession}
                  onPress={() => {
                    setExpandProfession(!expandProfession);
                  }}
                >
                  {getListItems(expandProfession)(
                    availableProfessions,
                    setDesiredProfession,
                    setExpandProfession
                  )}
                </List.Accordion>
              </ScrollView>
            </List.Section>
          </View>
          <View style={{ height: 150 }}>
            <List.Section>
              <ScrollView style={{ maxHeight: 150 }}>
                <List.Accordion
                  title={`Ordering: ${priceOrdering}`}
                  style={styles.dropDown}
                  titleStyle={{ fontSize: 12 }}
                  expanded={expandOrder}
                  onPress={() => {
                    setExpandOrder(!expandOrder);
                  }}
                >
                  {getListItems(expandOrder)(
                    ["asc", "desc"],
                    setPriceOrdering,
                    setExpandOrder
                  )}
                </List.Accordion>
              </ScrollView>
            </List.Section>
          </View>

          <View style={styles.searchAssist}>
            <TouchableRipple onPress={onSearchClick}>
              <Avatar.Icon size={44} icon="magnify" />
            </TouchableRipple>
            <TouchableRipple onPress={cleanData}>
              <Avatar.Icon size={44} icon="close-circle" />
            </TouchableRipple>
          </View>
        </View>
      </View>

      <View style={{ height: screenHeight * 0.75, paddingBottom: 40 }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            style={{ width: "100%" }}
            data={dataToDisplay}
            renderItem={renderSearchItem}
            keyExtractor={(item) => `${item.package_id}_${item.business_id}`}
          />
        </SafeAreaView>
      </View>
      <BookingDialog
        visible={visibleBookDialog}
        onClose={closeDialog}
        data={bookingData}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    // alignSelf: 'center',
    // alignItems: 'center',
    // paddingTop: 30,
    // maxWidth: 350,
  },
  searchResult: {
    borderColor: "black",
    backgroundColor: "#dddddd",
    // borderWidth: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // marginTop: 15,
  },
  searchResultWrapper: {
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "space-between",
  },
  resultText: {
    fontSize: 14,
    fontWeight: "bold",
    // padding: 4,
  },
  parentFilter: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // width: screenWidth * 0.5,
    // height: screenHeight * 0.6,
  },
  searchAssist: {
    flexDirection: "row",
    marginTop: 12,
  },
  dropDown: {
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    maxWidth: screenWidth / 4,
  },
  cardView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchScreen;

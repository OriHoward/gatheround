import { View, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import {
  Button,
  Title,
  Text,
  Card,
  Provider,
  Portal,
  Paragraph,
  TextInput,
  Dialog,
  RadioButton,
} from "react-native-paper";
import { AxiosContext } from "../../../../context/AxiosContext";
import SectionTitle from "../../../components/SectionTitle";

const PackageDetailsScreen = ({ route, navigation }) => {
  const { id, packageName, description, price, currency } = route.params;
  const [IsVisible, setIsVisible] = React.useState(false);
  const [currencyState, setCurrencyState] = useState("ILS");
  const [packageInfo, setPackageInfo] = React.useState({
    id,
    packageName,
    description,
    price,
  });
  const [checked, setChecked] = React.useState("first");
  const [isSaved, setIsSaved] = useState(true);
  const { authAxios } = useContext(AxiosContext);

  const showDialog = () => setIsVisible(true);
  const hideDialog = () => setIsVisible(false);

  const peachColor = "#FF7F50";

  const setCurrencyStatus = (currency, checked) => {
    setCurrencyState(currency);
    setChecked(checked);
  };

  const onPressedDelete = async () => {
    try {
      const data = {
        packageId: id,
      };
      await authAxios.delete("/business-package", { data });
      hideDialog();
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  const onPressedEdit = async () => {
    console.log("Not implemented yet");
  };

  return isSaved ? (
    <View style={styles.root}>
      <Card style={styles.cardContainer}>
        <Card.Content>
          <Title style={styles.title}>{packageName}</Title>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Price: </Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.currency}>{currency}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            icon="pencil"
            uppercase={false}
            color="black"
            onPress={() => setIsSaved(false)}
          >
            Edit
          </Button>
        </Card.Actions>
      </Card>
    </View>
  ) : (
    <View style={styles.root}>
      <Card style={styles.cardContainer}>
        <Title style={styles.title}>{"Edit Package Details"}</Title>
        <TextInput
          label={"Package Name"}
          value={packageName}
          activeUnderlineColor={peachColor}
          style={styles.input}
          onChange={(newPackageName) =>
            setPackageInfo({ ...packageInfo, packageName: newPackageName })
          }
        />
        <TextInput
          label={"Price"}
          value={price}
          activeUnderlineColor={peachColor}
          onChange={(newPrice) =>
            setPackageInfo({ ...packageInfo, price: newPrice })
          }
          style={styles.input}
        />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Text>ILS</Text>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setCurrencyStatus("ILS", "first")}
          />
          <Text>USD</Text>
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setCurrencyStatus("USD", "second")}
          />
          <Text>EUR</Text>
          <RadioButton
            value="third"
            status={checked === "third" ? "checked" : "unchecked"}
            onPress={() => setCurrencyStatus("EUR", "third")}
          />
        </View>
        <TextInput
          label={"Description"}
          value={description}
          activeUnderlineColor={peachColor}
          onChange={(newDesc) =>
            setPackageInfo({ ...packageInfo, description: newDesc })
          }
          style={styles.input}
        />
        <Card.Actions>
          <Button
            icon="content-save-edit"
            uppercase={false}
            color="black"
            onPress={() =>
              onPressedEdit()
                .then(setIsSaved(true))
                .catch((e) => console.error(e))
            }
          >
            Save
          </Button>
          <Button
            icon="delete"
            uppercase={false}
            color="black"
            onPress={showDialog}
          >
            Delete
          </Button>
          <Provider>
            <View>
              <Portal>
                <Dialog
                  visible={IsVisible}
                  onDismiss={hideDialog}
                  style={{ minWidth: 300, alignSelf: "center", marginTop: 250 }}
                >
                  <Dialog.Title>Alert</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>
                      Are you sure you want to delete this package?
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      uppercase={false}
                      color="black"
                      onPress={hideDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      uppercase={false}
                      color="black"
                      onPress={() =>
                        onPressedDelete()
                          .then()
                          .catch((e) => console.error(e))
                      }
                    >
                      Yes
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </Provider>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
    marginTop: 30,
  },
  cardContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    maxWidth: 500,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },
  price: {
    marginLeft: 4,
    fontSize: 20,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    maxWidth: 400,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    minWidth: 300,
    maxHeight: 70,
  },
});
export default PackageDetailsScreen;

import { View, StyleSheet } from "react-native";
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
} from "react-native-paper";
import { AxiosContext } from "../../../../context/AxiosContext";
const PackageDetailsScreen = ({ route, navigation }) => {
  const { id, packageName, description, price, currency } = route.params;
  const [IsVisible, setIsVisible] = React.useState(false);
  const [packageInfo, setPackageInfo] = React.useState({
    id,
    packageName,
    description,
    price,
  });
  const [isSaved, setIsSaved] = useState(true);
  const { authAxios } = useContext(AxiosContext);

  const showDialog = () => setIsVisible(true);
  const hideDialog = () => setIsVisible(false);

  const peachColor = "#FF7F50";

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
    try {
      await authAxios.put("/business-package", {
        ...packageInfo,
        packageId: id,
        package_name: packageInfo.packageName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return isSaved ? (
    <View style={styles.root}>
      <Card style={styles.cardContainer}>
        <Card.Content>
          <Title style={styles.title}>{packageInfo.packageName}</Title>
          <View style={styles.priceContainer}>
            <Text style={styles.label}>Price: </Text>
            <Text style={styles.price}>{packageInfo.price}</Text>
            <Text style={styles.currency}>{currency}</Text>
          </View>
          <Text style={styles.description}>{packageInfo.description}</Text>
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
    <View style={styles.editRoot}>
      <Card style={styles.cardEditContainer}>
        <Title style={styles.title}>{"Edit Package Details"}</Title>
        <TextInput
          label={"Package Name"}
          value={packageInfo.packageName}
          activeUnderlineColor={peachColor}
          style={styles.input}
          onChangeText={(newPackageName) => {
            setPackageInfo({ ...packageInfo, packageName: newPackageName });
          }}
        />
        <TextInput
          label={"Price"}
          value={packageInfo.price}
          activeUnderlineColor={peachColor}
          onChangeText={(newPrice) => {
            setPackageInfo({ ...packageInfo, price: newPrice });
          }}
          style={styles.input}
        />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginHorizontal: 15,
          }}
        ></View>
        <TextInput
          multiline={true}
          label={"Description"}
          value={packageInfo.description}
          activeUnderlineColor={peachColor}
          onChangeText={(newDesc) =>
            setPackageInfo({ ...packageInfo, description: newDesc })
          }
          style={styles.inputDesc}
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
                  style={styles.dialogStyle}
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
    marginTop: 15,
    marginBottom: 15,
    flex: 1,
    maxHeight: 300,
  },
  editRoot: {
    marginTop: 10,
    alignSelf: "center",
    minWidth: "25%",
    minHeight: "25%",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    minWidth: "50%",
    flex: 1
  },
  cardEditContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    minHeight: 350,
    minWidth: 250,
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
    marginHorizontal: 15,
  },
  inputDesc: {
    minWidth: 300,
    height: 100,
    marginHorizontal: 15,
    paddingBottom: 30,
  },
  dialogStyle: {
    minWidth: 300,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
});
export default PackageDetailsScreen;

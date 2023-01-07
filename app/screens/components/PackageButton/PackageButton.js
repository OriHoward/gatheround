import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Title, Text, Card, Button } from "react-native-paper";

const PackageButton = ({
  onPressCard,
  packageName,
  description,
  currency,
  price,
}) => {
  return (
    <View style={styles.root}>
      <Card style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          {/* <Image
            source={require("./../../../../assets/Images/packages.jpg")}
            style={styles.image}
          /> */}
        </View>
        <Card.Content style={{ zIndex: 1 }}>
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
            icon="eye-outline"
            uppercase={false}
            color="black"
            onPress={onPressCard}
          >
            View Package
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
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
    fontWeight: "bold",
  },
  price: {
    marginLeft: 4,
    fontSize: 20,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    maxWidth: 400,
    marginBottom: 5,
    fontWeight: "bold",
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
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default PackageButton;

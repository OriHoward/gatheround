import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Button, Title, Paragraph } from "react-native-paper";

const CalendarDetailsScreen = ({ route }) => {
  console.log(route.params.data);
  return (
    <View style={styles.root}>
      <Card mode="outlined">
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
    width: 500,
    borderRadius: 15,
  },
});

export default CalendarDetailsScreen;

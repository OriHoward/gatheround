import { View } from "react-native";
import React from "react";
import { Card, Title, Paragraph, Text, Divider } from "react-native-paper";
import { CardStyles } from "../../../../CommonStyles";

const CalendarDetailsScreen = ({ route }) => {
  const { id, date, category, description } = route.params;
  return (
    <View>
      <Card mode="outlined" style={CardStyles.cardContainer}>
        <Card.Content>
          <Title style={CardStyles.boldText}>{category}</Title>
          <Text style={CardStyles.boldText}>{date}</Text>
          <Divider style={{ marginTop: 10 }} />
          <Paragraph>{description}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CalendarDetailsScreen;

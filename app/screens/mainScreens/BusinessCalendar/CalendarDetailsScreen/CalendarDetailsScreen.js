import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Card,
  Title,
  Paragraph,
  Text,
  Divider,
  Avatar,
} from "react-native-paper";
import { CardStyles, EventCardStyles } from "../../../../CommonStyles";
import { categoryIcons } from "../../../../utils/category-icons";
import SectionTitle from "../../../components/SectionTitle";

const CalendarDetailsScreen = ({ route }) => {
  if (route.params.category === "Unavailable") {
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
  } else {
    const { id, description, name, date, time, category, address } =
      route.params;
    return (
      <View style={styles.root}>
        <Card mode="outlined" style={CardStyles.cardContainer}>
          <Card.Title
            title={name}
            subtitle={category}
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon={categoryIcons[`${category}`]?.icon || "calendar-star"}
                color={"white"}
                style={{
                  backgroundColor:
                    categoryIcons[`${category}`]?.color || "blueviolet",
                }}
              />
            )}
          />
          <Card.Content>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={EventCardStyles.header2_date}>{date}</Text>
              <Text style={EventCardStyles.header2_time}>{`, ${time}`}</Text>
            </View>
            <Text style={EventCardStyles.header3}>{address}</Text>
            <Divider style={{ marginTop: 10 }} />
            {description === "" ? (
              <>
                <SectionTitle title={"No messages from event host"} />
              </>
            ) : (
              <>
                <SectionTitle title={"Message from event host"} />
                <Paragraph>{description}</Paragraph>
              </>
            )}
          </Card.Content>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    alignContent: "center",
    borderRadius: 15,
    flex: 1,
  },
});

export default CalendarDetailsScreen;

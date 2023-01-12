import { View, Text, ImageBackground } from "react-native";
import React from "react";
import backgroundImage from "../../../../assets/Images/app-background.jpg";

const ArchiveScreen = () => {
  return (
    <View style={{ alignContent: "center", flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.4 }}
      >
        <Text>ArchiveScreen</Text>
      </ImageBackground>
    </View>
  );
};

export default ArchiveScreen;

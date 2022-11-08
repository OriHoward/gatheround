import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button ,ImageBackground,SafeAreaView} from 'react-native';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./Images/test.png")} resizeMode = "cover"
       style = {styles.image}>
      <Button
        title="Press me" style = {styles.fixToText} color="#f194ff"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <StatusBar style="auto" />
      </ImageBackground>
      </SafeAreaView>
       
  
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems : "center",
  //   justifyContent : "center"
  // },
    image: {
    flex: 1,
    justifyContent: "center"
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });

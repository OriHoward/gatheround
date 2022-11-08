import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity, TextInput ,ImageBackground,SafeAreaView,Alert} from 'react-native';


export default function App() {
  return (
      
      <ImageBackground source={require("./Images/test.png")} resizeMode = "cover"
       style = {styles.image}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style = {styles.container}>
        <TouchableOpacity onPress={() => Alert.alert('Login button pressed')} style = {styles.button}>
          <Text style = {styles.buttonText}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Create Account Button pressed')} style = {styles.buttonReg}>
          <Text style = {styles.buttonText}> Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style = {styles.forgotBtn}>Forgot Password</Text>
        </TouchableOpacity>
        <TextInput style = {styles.input}  placeholder = "Username"/>
        <TextInput style = {styles.input}  placeholder = "Password"/>
      <StatusBar style="auto" />
      </KeyboardAvoidingView>
      </SafeAreaView>
      </ImageBackground>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : "center",
    justifyContent : "flex-end"

  },
    image: {
    flex: 1,
    },
    button : {
      backgroundColor: "#72A2FE",
      padding : 20,
      borderRadius: 10,
      width : 200,
      height : 60,
      top : 0
    },
    buttonReg : {
      backgroundColor: "#72A2FE",
      padding : 20,
      borderRadius: 10,
      width : 200,
      height : 60,
      top : 10
    },
    buttonText : {
      textAlign : "center",
      color : "black"
    },
    input: {
      height: 50,
      width : 220,
      borderColor : "#383839",
      textAlign : "center",
      margin: 12,
      borderWidth: 2,
      padding: 7,
      bottom : 400,
    },
    forgotBtn : {
      height: 30,
      margin : 20,
    }
  });

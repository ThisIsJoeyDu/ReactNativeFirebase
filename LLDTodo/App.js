import react from "react";
import { 
  TextInput,
  Text, 
  View,
  SafeAreaView,
  Button,
 } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import homePage from "./Home";


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My todo App" component={homePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
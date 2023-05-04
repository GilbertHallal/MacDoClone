import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginTab from './Nav/loginNav.js';
import Main from './Nav/main.js';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: { color: '#FFC72C' },
        headerTintColor: '#FFC72C'
      }}
    >
      <Stack.Screen name="Login" component={LoginTab} options={{headerStyle: {backgroundColor:'#DA291C'}}} />

      <Stack.Screen name = "Main" component={Main} options={{headerStyle: {backgroundColor:'#DA291C'}}} />
    </Stack.Navigator>
    
      
    </NavigationContainer>
  );
}





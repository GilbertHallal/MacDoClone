
import * as React from 'react';
import Login from '../Login/login.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sign from '../Login/signup.js'

const Drawer = createDrawerNavigator();

const LoginTab = ({navigation}) => {
    navigation.setOptions({ headerShown: false });
  return (
      <Drawer.Navigator useLegacyImplementation
       initialRouteName="Home"
       screenOptions={{
        headerTitleStyle: { color: '#FFC72C' },
        headerTintColor: '#FFC72C',
        drawerStyle: {
            backgroundColor: '#DA291C'
          },
        drawerActiveBackgroundColor: '#FFC72C',
        drawerActiveTintColor: '#DA291C',
        drawerInactiveTintColor: '#FFC72C'
      }}>
        <Drawer.Screen name="Login" component={Login} options={{headerStyle: {backgroundColor:'#DA291C'}}}/>
        <Drawer.Screen name="Sign up" component={Sign} options={{headerStyle: {backgroundColor:'#DA291C'}}}/>
      </Drawer.Navigator>
    
  );
}

export default LoginTab;

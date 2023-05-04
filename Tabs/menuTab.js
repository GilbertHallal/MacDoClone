import React, { useState } from 'react';
import Menu from '../Driver/menu.js'
import Details from '../Driver/details.js'
import Cart from '../Driver/cart.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MenuTab = ({route, navigation}) => {
  const {id} = route.params
    navigation.setOptions({ headerShown: false });
    const Stack = createNativeStackNavigator();
    return (
    
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerTitleStyle: { color: '#FFC72C' },
        headerTintColor: '#FFC72C'
      }}
    >
      <Stack.Screen name="Menu" component={Menu} options={{headerStyle: {backgroundColor:'#DA291C'}}} 
      initialParams={{list: [], id:id}} />

      <Stack.Screen name = "Details" component={Details} options={{headerStyle: {backgroundColor:'#DA291C'}}} />
      <Stack.Screen name = "Cart" component={Cart} options={{headerStyle: {backgroundColor:'#DA291C'}}} />
    </Stack.Navigator>
    
  );
}

export default MenuTab;
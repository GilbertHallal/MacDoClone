import * as React from 'react';
import MenuTab from '../Tabs/menuTab.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../Tabs/account.js';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const Main = ({route, navigation}) => {
    const { id } = route.params
    navigation.setOptions({ headerShown: false });
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Menu') {
              iconName = 'hamburger';
            } else if (route.name === 'Account') {
              iconName = 'id-card';
            }

            return <Icon name={iconName} size={size} type='font-awesome-5' color={color} />;
            
          },
          tabBarActiveTintColor: '#FFC72C',
          tabBarInactiveTintColor: '#27251F',
        }) }
      >
        <Tab.Screen name="Menu" component={MenuTab} options={{tabBarStyle: {backgroundColor:'#DA291C'}}}
        initialParams={{id: id}}/>
        <Tab.Screen name="Account" component={Account} 
        options={{tabBarStyle: {backgroundColor:'#DA291C'},
        headerStyle:{backgroundColor:'#DA291C'}}}
         initialParams={{id: id}}/>
      </Tab.Navigator>
  );
}

export default Main
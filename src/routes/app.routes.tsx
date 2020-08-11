import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Finder from './finder.routes';

import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'help-box';

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Finder') {
          iconName = focused ? 'search-web' : 'search-web';
        } else if (route.name === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Inbox') {
          iconName = focused ? 'email' : 'email-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }

        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        position: 'absolute',
        elevation: 0,
      },
      showLabel: false,
    }}
    initialRouteName="Home"
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Finder" component={Finder} />
    <Tab.Screen name="Cart" component={Cart} />
    <Tab.Screen name="Inbox" component={Inbox} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default AppRoutes;

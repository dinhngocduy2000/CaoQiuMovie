import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/HomeScreen/HomeScreen';
import MyTickets from '../features/MyTickets/MyTickets';
import Profile from '../features/Profile/Profile';
import {SvgUri, SvgXml} from 'react-native-svg';

import {StatusBar} from 'react-native';
import svgs from '../features/assets/svg/svg_tabbar';

const Tab = createBottomTabNavigator();
type Props = {};

const TabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = svgs.home_tabbar;
          } else if (route.name === 'Profile') {
            iconName = svgs.profile_tabbar;
          } else if (route.name === 'MyTicket') {
            iconName = svgs.ticket_tabbar;
          }
          // You can return any component that you like here!
          return (
            <View
              style={{
                borderRadius: 64 / 2,
                width: 64,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 64,
                backgroundColor: focused ? '#FF5524' : 'black',
              }}>
              <SvgXml width={30} height={30} xml={iconName} />
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: 'black',
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          padding: 15,
          borderTopWidth: 0,
        },
      })}
      initialRouteName="Home">
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="MyTicket"
        component={MyTickets}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});

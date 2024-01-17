import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/HomeScreen/HomeScreen';
import MyTickets from '../features/MyTickets/MyTickets';
import Profile from '../features/Profile/Profile';
import {SvgUri, SvgXml} from 'react-native-svg';
import svgs from '../features/assets/svg/svg_tabbar';
import SearchResultScreen from '../features/SearchResultScreen/SearchResultScreen';
import {COLOR_ENUM} from '../libraries/ENUMS/ColorEnum';

const Tab = createBottomTabNavigator();
type Props = {
  setInitRoute: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

const TabNavigator = ({setInitRoute}: Props) => {
  const RenderProfileScreen = () => {
    return <Profile setInitRoute={setInitRoute} />;
  };
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
          } else if (route.name === 'SearchResult') {
            iconName = svgs.search_icon;
          }
          // You can return any component that you like here!
          return (
            <View
              style={{
                borderRadius: 54 / 2,
                width: 54,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 54,
                backgroundColor: focused ? '#FF5524' : COLOR_ENUM.DARK_MODE,
              }}>
              <SvgXml width={30} height={30} xml={iconName} />
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: COLOR_ENUM.DARK_MODE,
          height: 90,
          display: 'flex',
          justifyContent: 'center',
          padding: 10,
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
        name="SearchResult"
        component={SearchResultScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="MyTicket"
        component={MyTickets}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={RenderProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});

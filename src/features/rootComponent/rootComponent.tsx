import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackHeaderProps,
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import TabNavigator from '../../navigators/TabNavigator';
import MovieDetail from '../MovieDetail/MovieDetail';
import SeatBookingScreen from '../SeatBooking/SeatBookingScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MovieTrailer from '../MovieTrailer/MovieTrailer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../../libraries/ENUMS/AsyncStorageKeys';
import LoginScreen from '../LoginScreen/LoginScreen';
import {SvgXml} from 'react-native-svg';
import svgs from '../assets/svg/svg_tabbar';
import SearchInputComponent from '../../libraries/components/SearchInputs/SearchInputComponent';
import {loginWithToken} from '../../apiHelper/api';
import Profile from '../Profile/Profile';

type Props = {};

const RootComponent = (props: Props) => {
  const Stack = createStackNavigator();
  const insets = useSafeAreaInsets();

  const [initialRoute, setInitialRoute] = useState<string | null>();
  const checkSessionId = async () => {
    try {
      const sessionId = await AsyncStorage.getItem(STORAGE_KEY.GET_SESSION_ID);
      console.log('GET SESSION ID: ', sessionId);
      setInitialRoute(sessionId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkSessionId();
  }, []);
  const RenderLogin = () => {
    return <LoginScreen setInitRoute={setInitialRoute} />;
  };
  const RenderTab = () => {
    return <TabNavigator setInitRoute={setInitialRoute} />;
  };
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName={'Tab'}
        screenOptions={{
          gestureEnabled: true,
          animationEnabled: true,
          headerMode: 'screen',
          header: ({navigation, back}: StackHeaderProps) => {
            console.log(back);

            return back ? (
              <View
                style={{
                  backgroundColor: 'transparent',
                  paddingTop: Platform.OS === 'ios' ? insets.top : 25,
                  paddingLeft: 35,
                  position: 'absolute',
                }}>
                <TouchableOpacity
                  onPress={navigation.goBack}
                  style={styles.header_outer}>
                  <View style={styles.header_inner}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      ×
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null;
          },
          headerStyle: {
            height: 20,
          },
        }}>
        {initialRoute === null ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="LoginScreen"
            component={RenderLogin}
          />
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Tab"
              component={RenderTab}
            />

            <Stack.Group
              screenOptions={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forScaleFromCenterAndroid,
                presentation: 'transparentModal',
              }}>
              <Stack.Screen
                name="MovieTrailer"
                component={MovieTrailer}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forScaleFromCenterAndroid,
                }}
              />
            </Stack.Group>
            <Stack.Screen
              options={{
                freezeOnBlur: true,
                cardStyleInterpolator:
                  CardStyleInterpolators.forScaleFromCenterAndroid,
              }}
              name="MovieDetail"
              component={MovieDetail}
            />

            <Stack.Screen
              name="SeatBooking"
              component={SeatBookingScreen}
              options={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forRevealFromBottomAndroid,
              }}
            />
          </>
        )}
      </Stack.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            cardOverlay: () => <ModalOverlay />,
            cardOverlayEnabled: true,
            cardStyle: {
              width: 500,
              position: 'absolute',
              top: 40,
              right: 40,
              bottom: 40,
              borderRadius: 6,
            },
          }}>
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetail}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default RootComponent;

const styles = StyleSheet.create({
  header_inner: {
    height: 22,
    width: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    paddingBottom: 2,
    borderWidth: 2,
  },
  header_outer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5524',
  },
});

import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  StackHeaderProps,
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
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
import {RootStackParamList} from '../../libraries/types/root-stack-param';
import {useAppDispatch} from '../../redux/hooks';
import {fetchProfileDetailThunk} from '../../redux/profileSlice/profileSlice';
import {AccessToken} from '../../libraries/ENUMS/Access_Token';
type Props = {};

const RootComponent = (props: Props) => {
  const Stack = createStackNavigator<RootStackParamList>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [initialRoute, setInitialRoute] = useState<string | null>();

  const checkSessionId = async () => {
    try {
      const sessionId: string | null = await AsyncStorage.getItem(
        STORAGE_KEY.GET_SESSION_ID,
      );
      await dispatch(
        fetchProfileDetailThunk({
          sessionId: sessionId || '',
          accessToken: AccessToken.ACCESS_TOKEN,
        }),
      );
      console.log('GET SESSION ID: ', sessionId);
      setInitialRoute(sessionId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkSessionId();
  }, []);

  const RenderLogin = (): React.ReactNode => {
    return <LoginScreen setInitRoute={setInitialRoute} />;
  };
  const RenderTab = (): React.ReactNode => {
    return <TabNavigator setInitRoute={setInitialRoute} />;
  };
  const renderBackNavigator = (
    navigation: StackNavigationProp<ParamListBase, string, undefined>,
    back:
      | {
          title: string;
        }
      | undefined,
  ): any => {
    return (
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
    );
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

            return back ? renderBackNavigator(navigation, back) : null;
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
              options={{headerShown: false, title: 'HOME'}}
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
                  title: 'trailer',
                  cardStyleInterpolator:
                    CardStyleInterpolators.forScaleFromCenterAndroid,
                }}
              />
            </Stack.Group>
            <Stack.Screen
              options={{
                freezeOnBlur: true,
                title: 'MOVIE DETAIL',
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
                title: 'BOOKING',
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

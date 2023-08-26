import {
  Animated,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackHeaderProps,
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
  TransitionPresets,
} from '@react-navigation/stack';
import TabNavigator from '../../navigators/TabNavigator';
import MovieDetail from '../MovieDetail/MovieDetail';
import SeatBookingScreen from '../SeatBooking/SeatBookingScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MovieTrailer from '../MovieTrailer/MovieTrailer';
import ModalOverlay from '../../libraries/components/ModalOverlay/ModalOverlay';

type Props = {};

const RootComponent = (props: Props) => {
  const Stack = createStackNavigator();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Tab"
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
                  paddingTop: insets.top,
                  paddingLeft: 35,
                  position: 'absolute',
                }}>
                <TouchableOpacity
                  onPress={navigation.goBack}
                  style={styles.header_outer}>
                  <View style={styles.header_inner}>
                    <Text style={{color: 'white', fontSize: 14}}>×</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null;
          },
          headerStyle: {
            height: 20,
          },
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Tab"
          component={TabNavigator}
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
    height: 20,
    width: 20,
    borderRadius: 10,
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

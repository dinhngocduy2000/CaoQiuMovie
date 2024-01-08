import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import svgs from '../assets/svg/svg_tabbar';
import SearchInputComponent from '../../libraries/components/SearchInputs/SearchInputComponent';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
type Props = {};

const MyTickets = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_ENUM.DARK_MODE,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <SvgXml xml={svgs.logo} width={200} height={200} />
        <Text style={{color: 'white', fontSize: 24}}>
          Welcome To MapleMovies!{' '}
        </Text>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 50,
            alignItems: 'center',
          }}>
          <SearchInputComponent placeholder="Username" />
          <SearchInputComponent isPassword placeholder="Password" />
          <TouchableOpacity
            style={{
              height: 50,
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FF5524',
              marginTop: 20,
              borderRadius: 24,
            }}>
            <Text style={{color: 'white'}}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyTickets;

const styles = StyleSheet.create({});

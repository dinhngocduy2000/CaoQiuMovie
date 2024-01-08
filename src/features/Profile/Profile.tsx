import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../../libraries/ENUMS/AsyncStorageKeys';
import {logOutWithToken} from '../../apiHelper/api';
import {SvgXml} from 'react-native-svg';
import svgs from '../assets/svg/svg_tabbar';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
type Props = {
  setInitRoute: any;
};
// NfcManager.start();
const Profile = ({setInitRoute}: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const [sessionId, setSessionId] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logOutWithToken(sessionId || '');
      setInitRoute(null);
      AsyncStorage.removeItem(STORAGE_KEY.GET_SESSION_ID);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSessionId = async () => {
    try {
      const session_id = await AsyncStorage.getItem(STORAGE_KEY.GET_SESSION_ID);
      setSessionId(session_id);
    } catch (error) {
      console.log(error);
    }
  };
  // async function readNdef() {
  //   try {
  //     // register for the NFC tag with NDEF in it
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     // the resolved tag object will contain `ndefMessage` property
  //     const tag = await NfcManager.getTag();
  //     console.warn('Tag found', tag);
  //   } catch (ex) {
  //     console.warn('Oops!', ex);
  //   } finally {
  //     // stop the nfc scanning
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // }
  useEffect(() => {
    fetchSessionId();
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_ENUM.DARK_MODE,
        justifyContent: 'center',
        height: windowHeight,
        width: '100%',
      }}>
      {/* <SvgXml xml={svgs.logo} width={200} height={200} /> */}
      <Image
        source={{
          uri: 'https://media.tenor.com/RcX3hUY425kAAAAi/toothless-dragon-toothless.gif',
        }}
        style={{width: 400, height: 400}}
      />
      <Text style={{color: 'white', fontSize: 24}}>Loading...</Text>
    </View>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_ENUM.DARK_MODE,
      }}>
      <TouchableOpacity
        onPress={() => handleLogout()}
        // onPress={() => readNdef()}
        style={{
          height: 50,
          width: '50%',
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 24,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});

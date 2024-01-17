import {
  ActivityIndicator,
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
import {
  BASE_URL,
  IMAGE_URL,
  axios_get,
  logOutWithToken,
} from '../../apiHelper/api';
import {SvgXml} from 'react-native-svg';
import svgs from '../assets/svg/svg_tabbar';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {api_url} from '../../apiHelper/URL_ENUM';
import {err} from 'react-native-svg/lib/typescript/xml';
import axios from 'axios';
import {USER_DETAIL} from '../../libraries/types/user_detail';
import {getScreenHeight} from '../../libraries/utils/getScreenHeight';
type Props = {
  setInitRoute: any;
};
// NfcManager.start();
const Profile = ({setInitRoute}: Props) => {
  const [sessionId, setSessionId] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<USER_DETAIL>();
  const insets = useSafeAreaInsets();
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
  const getUserDetails = async (session_id: string) => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/account/20321210',
      params: {session_id: session_id},
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQxZWMzOGNhZjBmOTFlNWU3Yjg0ZjBkOGFiNWNkYyIsInN1YiI6IjY0ZTAxZDhkNWFiODFhMDEzOTFhMmRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVjpYD_yoeXMrhs563dcy09A15GLe_-4NdQBL02Q-sc',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        setUserDetail(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
  useEffect(() => {
    if (sessionId) {
      getUserDetails(sessionId);
    }
  }, [sessionId]);

  return !userDetail || loading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_ENUM.DARK_MODE,
        justifyContent: 'center',
        height: getScreenHeight(),
        width: '100%',
      }}>
      {/* <SvgXml xml={svgs.logo} width={200} height={200} /> */}
      <ActivityIndicator size={'large'} color={COLOR_ENUM.PRIMARY_COLOR} />
      <Text style={{color: 'white', fontSize: 24, marginTop: 20}}>
        Loading...
      </Text>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_ENUM.DARK_MODE,
        paddingTop: insets.top,
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.headerBackground,
          {
            height: getScreenHeight() / 4,
            borderBottomLeftRadius: getScreenHeight() / 8,
            borderBottomRightRadius: getScreenHeight() / 8,
          },
        ]}>
        <Image
          style={styles.avatar}
          source={{
            uri: IMAGE_URL + '/original' + userDetail.avatar.tmdb.avatar_path,
          }}
        />
      </View>
      <View style={styles.userDetail}>
        <Text style={[styles.userDetailInfo, styles.userDetailInfoName]}>
          {userDetail.name}
        </Text>
        <Text style={[styles.userDetailInfo, styles.userDetailInfoUserName]}>
          {userDetail.username}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleLogout()}
        // onPress={() => readNdef()}
        style={styles.logOut}>
        <Text style={{color: 'white', fontSize: 20}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
    minHeight: 100,
    marginBottom: 70,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
    position: 'absolute',
    bottom: -50,
    left: '33%',
  },
  userDetail: {},
  userDetailInfo: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  userDetailInfoName: {
    fontSize: 26,
    fontWeight: '600',
  },
  userDetailInfoUserName: {
    fontSize: 20,
    fontWeight: '600',
    color: 'gray',
  },
  logOut: {
    height: 50,
    width: '50%',
    backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 20,
  },
});

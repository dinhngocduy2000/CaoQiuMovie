import {
  ActivityIndicator,
  Image,
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
  fetchUserDetail,
  logOutWithToken,
} from '../../apiHelper/api';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import {USER_DETAIL} from '../../libraries/types/user_detail';
import {getScreenHeight} from '../../libraries/utils/getScreenHeight';
import {AccessToken} from '../../libraries/ENUMS/Access_Token';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {fetchProfileDetailThunk} from '../../redux/profileSlice/profileSlice';
type Props = {
  setInitRoute: any;
};
// NfcManager.start();
const Profile = ({setInitRoute}: Props) => {
  const [sessionId, setSessionId] = useState<string | null>('');
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile.data);
  const loading = useAppSelector(state => state.profile.loading);
  const insets = useSafeAreaInsets();
  const handleLogout = async () => {
    // setLoading(true);
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
      if (!profile) {
        dispatch(
          fetchProfileDetailThunk({
            sessionId: sessionId || '',
            accessToken: AccessToken.ACCESS_TOKEN,
          }),
        );
      }
      setSessionId(session_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSessionId();
  }, []);

  return !profile || loading === 'loading' ? (
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
            uri: IMAGE_URL + '/original' + profile?.avatar.tmdb.avatar_path,
          }}
        />
      </View>
      <View style={styles.userDetail}>
        <Text style={[styles.userDetailInfo, styles.userDetailInfoName]}>
          {profile.name}
        </Text>
        <Text style={[styles.userDetailInfo, styles.userDetailInfoUserName]}>
          {profile.username}
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

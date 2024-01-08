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
import {SvgXml} from 'react-native-svg';
import SearchInputComponent from '../../libraries/components/SearchInputs/SearchInputComponent';
import svgs from '../assets/svg/svg_tabbar';
import {getSessionId, loginWithToken} from '../../apiHelper/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../../libraries/ENUMS/AsyncStorageKeys';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import LinearGradient from 'react-native-linear-gradient';

type Props = {};

const LoginScreen = ({navigation, setInitRoute}: any) => {
  const windowHeight = Dimensions.get('window').height;
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [clearCredential, setClearCredential] = useState<boolean>(true);
  const handleLogin = async () => {
    setClearCredential(true);
    setLoading(true);
    try {
      const sessionId = await loginWithToken(
        username,
        password,
        setClearCredential,
      );
      console.log('SESSION ID: ', sessionId);
      if (sessionId) {
        AsyncStorage.setItem(STORAGE_KEY.GET_SESSION_ID, sessionId);
        setInitRoute(sessionId);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    !clearCredential && setLoading(false);
  }, [clearCredential]);

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
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {/* <SvgXml xml={svgs.logo} width={200} height={200} /> */}
        <Image
          source={{
            uri: 'https://media.tenor.com/RcX3hUY425kAAAAi/toothless-dragon-toothless.gif',
          }}
          style={{
            width: 250,
            height: 250,
            backgroundColor: '#FF5524',
            margin: 15,
            borderRadius: 50,
          }}
        />
        <Text style={{color: 'white', fontSize: 24}}>
          Welcome To ToothLess!{' '}
        </Text>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 50,
            // alignItems: 'center',
          }}>
          <SearchInputComponent
            onChangeText={username => setUserName(username)}
            style={{borderColor: '#FF5524'}}
            placeholder="Username"
          />
          {!clearCredential && (
            <Text
              style={{
                color: '#ff5524',
                fontSize: 12,
                marginVertical: 10,
                textAlign: 'left',
              }}>
              Check your username and password and try again
            </Text>
          )}
          <SearchInputComponent
            style={{borderColor: '#FF5524'}}
            isPassword
            placeholder="Password"
            onChangeText={password => setPassword(password)}
          />
          {!clearCredential && (
            <Text
              style={{
                color: '#ff5524',
                fontSize: 12,
                marginVertical: 10,
                textAlign: 'left',
              }}>
              Check your username and password and try again
            </Text>
          )}
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={{
              height: 50,
              width: '100%',
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
      <LinearGradient
        colors={['#121212', '#FF5524']}
        style={{height: '100%', width: '100%', opacity: 0.8}}></LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

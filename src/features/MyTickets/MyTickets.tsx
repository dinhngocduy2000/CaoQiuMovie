import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MyTicketsType} from '../../libraries/types/myTickets';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import SVG_MovieDetail from '../assets/svg/svg_movieDetail';
import myTicketsSVG from '../assets/svg/myTickets';
type Props = {
  navigation: any;
};

const MyTickets = (props: Props) => {
  const {navigation} = props;
  const inset = useSafeAreaInsets();
  const [bookedTickets, setBookedTickets] = useState<MyTicketsType[]>([]);
  const windowWidth = Dimensions.get('window').width;
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const getMyTickets = async () => {
    // setRefreshing(true);
    try {
      const myTickets = await AsyncStorage.getItem('Movie Tickets');
      if (myTickets) {
        console.log(myTickets);

        console.log(JSON.parse(myTickets || ''));
        setBookedTickets(JSON.parse(myTickets || ''));
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    getMyTickets();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e: Event) => {
      // Do somethingnav
      console.log('FOCUSING');
      onRefresh();

      navigation.removeListener;
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={[styles.myTicketsCtn, {paddingTop: inset.top}]}>
      <Text style={styles.myTicketsTitle}>Booked Tickets</Text>
      <FlatList
        data={bookedTickets}
        refreshControl={
          <RefreshControl
            style={{zIndex: 10}}
            colors={[COLOR_ENUM.PRIMARY_COLOR]}
            tintColor={COLOR_ENUM.PRIMARY_COLOR}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View style={styles.ticketListItem}>
            <ImageBackground
              style={styles.movieTicketPoster}
              borderTopLeftRadius={24}
              borderTopRightRadius={24}
              source={{
                uri: item.item.moviePoster,
              }}>
              <LinearGradient
                colors={['#00000000', COLOR_ENUM.PRIMARY_COLOR]}
                style={{
                  height: '100%',
                  width: '100%',
                  opacity: 0.7,
                }}></LinearGradient>
            </ImageBackground>
            <View style={[styles.ticketInfo, {height: 'auto'}]}>
              <Text
                style={[
                  styles.tickketInfoText,
                  {fontSize: 24, fontWeight: '800'},
                ]}>
                {item.item.movieName}
              </Text>
              <View style={styles.timeAndSeats}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.tickketInfoText,
                      {marginBottom: 0, fontSize: 20, fontWeight: '800'},
                    ]}>
                    Time
                  </Text>
                  <Text style={styles.tickketInfoText}>
                    {item.item.movieDate}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.tickketInfoText,
                      {marginBottom: 0, fontSize: 20, fontWeight: '800'},
                    ]}>
                    Seats
                  </Text>
                  <Text style={styles.tickketInfoText}>
                    {item.item.selectedSeats}
                  </Text>
                </View>
              </View>
              <SvgXml
                xml={myTicketsSVG.barcode}
                width={windowWidth}
                height={80}
                color={'white'}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  myTicketsCtn: {
    backgroundColor: COLOR_ENUM.DARK_MODE,
    flex: 1,
  },
  myTicketsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    margin: 20,
  },
  ticketListItem: {
    width: '100%',
    paddingHorizontal: '15%',
    marginVertical: 20,
  },
  movieTicketPoster: {
    width: '100%',
    height: 400,
  },
  ticketInfo: {
    borderTopColor: 'white',
    borderTopWidth: 4,
    backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tickketInfoText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },

  timeAndSeats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

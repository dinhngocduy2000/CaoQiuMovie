import {LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {COLOR_ENUM} from '../../libraries/ENUMS/ColorEnum';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {seatDetail, seatDetails} from './mockSeatsData';
import SeatColumnComponent from './components/SeatColumn/seat-column';
import SelectDateTimeComponent from './components/SelectDateAndTime/select-time';
type Props = {};

const SeatBookingScreen = (props: Props) => {
  const {route, navigation}: any = props;
  const {movieName, moviePoster} = route.params;
  const inset = useSafeAreaInsets();
  const [seatList, setSeatList] = useState<seatDetail[]>(seatDetails);
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={[
        styles.seatBookingCtn,
        {
          paddingTop: inset.top,
        },
      ]}>
      <Text style={styles.seatBookingTitle}>Select Date</Text>
      <View style={styles.seatSelectCtn}>
        <Text
          style={[styles.seatBookingTitle, {fontSize: 18, marginBottom: 20}]}>
          Screen
        </Text>
        <View style={styles.screenLine}></View>
        <View
          style={[
            styles.screenLine,
            {
              marginTop: 5,
              height: 10,
              opacity: 0.2,
            },
          ]}></View>
        <View style={styles.seatListsCtn}>
          <SeatColumnComponent
            seatList={seatList.filter(seat => Number(seat.column) < 5)}
            selectedSeats={selectedSeat}
            setSelectedSeat={setSelectedSeat}
          />
          <SeatColumnComponent
            seatList={seatList.filter(seat => Number(seat.column) > 4)}
            selectedSeats={selectedSeat}
            setSelectedSeat={setSelectedSeat}
          />
        </View>
        <View style={styles.seatsColorNote}>
          <View style={styles.seatColor}>
            <View
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: 10,
                // marginBottom: 10,
                backgroundColor: 'transparent',
                borderColor: '#8A2A0E',
                borderWidth: 1,
                justifyContent: 'center',
              }}></View>
            <Text style={{color: 'white', fontWeight: '600'}}>Avalible</Text>
          </View>
          <View style={styles.seatColor}>
            <View
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: 10,
                // marginBottom: 10,
                backgroundColor: '#8A2A0E',
                borderColor: '#8A2A0E',
                borderWidth: 1,
                justifyContent: 'center',
              }}></View>
            <Text style={{color: 'white', fontWeight: '600'}}>Reserved</Text>
          </View>
          <View style={styles.seatColor}>
            <View
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: 10,
                // marginBottom: 10,
                backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
                borderColor: '#8A2A0E',
                borderWidth: 1,
                justifyContent: 'center',
              }}></View>
            <Text style={{color: 'white', fontWeight: '600'}}>Selected</Text>
          </View>
        </View>
      </View>
      <SelectDateTimeComponent
        selectedSeat={selectedSeat}
        navigation={navigation}
        movieName={movieName}
        moviePoster={moviePoster}
      />
    </ScrollView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  seatBookingCtn: {
    backgroundColor: 'black',
    // flex: 1,
    // height: '100%',
    minHeight: '100%',
    display: 'flex',
    padding: 20,
  },
  seatBookingTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: '600',
    marginTop: 5,
  },
  seatSelectCtn: {
    // flex: 0.5,
    backgroundColor: COLOR_ENUM.DARK_MODE,
    marginTop: 20,
    borderRadius: 24,
    padding: 15,
  },
  screenLine: {
    width: '100%',
    height: 5,
    backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
  },
  seatListsCtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    marginBottom: 20,
  },
  seatListColumn: {
    width: '45%',
    // height: 200,
  },
  seatsColorNote: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seatColor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

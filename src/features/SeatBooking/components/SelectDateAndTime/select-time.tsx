import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {COLOR_ENUM} from '../../../../libraries/ENUMS/ColorEnum';
import {Root, SPSheet} from 'react-native-popup-confirm-toast';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {SvgXml} from 'react-native-svg';
import svgBooking from '../../../assets/svg/svg_movieBooking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyTicketsType} from '../../../../libraries/types/myTickets';
type Props = {
  movieName: string;
  selectedSeat: string[];
  navigation: any;
  moviePoster: string;
};

const SelectDateTimeComponent = (props: Props) => {
  const {movieName, selectedSeat, navigation, moviePoster} = props;
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(true);
  const timeArrays: string[] = [
    '14:00',
    '15:30',
    '17:00',
    '19:00',
    '21:00',
    '23:00',
  ];
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['45%', '45%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleConfirmBooking = async () => {
    const data: MyTicketsType = {
      movieName: movieName,
      movieDate: selectedDate + ' ' + selectedTime,
      selectedSeats: selectedSeat.join(', '),
      moviePoster: moviePoster,
    };
    console.log(data);

    try {
      const myTickets = await AsyncStorage.getItem('Movie Tickets');
      if (myTickets) {
        const parsedTickets: MyTicketsType[] = JSON.parse(myTickets || '');
        parsedTickets.unshift(data);

        await AsyncStorage.setItem(
          'Movie Tickets',
          JSON.stringify(parsedTickets),
        );
      } else {
        await AsyncStorage.setItem('Movie Tickets', JSON.stringify([data]));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setModalOpen(true);
      bottomSheetModalRef.current?.close();
      setModalLoading(true);
    }
  };
  useEffect(() => {
    modalLoading &&
      setTimeout(() => {
        setModalLoading(false);
      }, 1500);
  }, [modalLoading]);

  const dateArrays: string[] = ['1/12', '2/12', '3/12', '4/12', '5/12', '6/12'];
  return (
    <BottomSheetModalProvider>
      <View style={styles.selectTimeCtn}>
        <Text style={styles.selectTitle}>Select Date</Text>
        <FlatList
          data={dateArrays}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (selectedDate === item) {
                  setSelectedDate('');
                } else {
                  setSelectedDate(item);
                }
              }}
              style={[
                styles.timeItem,
                {
                  backgroundColor:
                    selectedDate === item
                      ? COLOR_ENUM.PRIMARY_COLOR
                      : '#282828',
                },
                styles.dateItem,
              ]}>
              <Text
                style={[
                  styles.timeItemText,
                  {
                    color: selectedDate === item ? 'white' : 'gray',
                  },
                ]}>
                Dec
              </Text>
              <Text
                style={[
                  styles.timeItemText,
                  {
                    color: selectedDate === item ? 'white' : 'gray',
                    fontSize: 18,
                    fontWeight: '600',
                  },
                ]}>
                {item.split('/')[0]}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text style={[styles.selectTitle, {marginTop: 20}]}>Select Time</Text>
        <FlatList
          data={timeArrays}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (selectedTime === item) {
                  setSelectedTime('');
                } else {
                  setSelectedTime(item);
                }
              }}
              style={[
                styles.timeItem,
                {
                  backgroundColor:
                    selectedTime === item
                      ? COLOR_ENUM.PRIMARY_COLOR
                      : '#282828',
                },
              ]}>
              <Text
                style={[
                  styles.timeItemText,
                  {color: selectedTime === item ? 'white' : 'gray'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={handlePresentModalPress}
          disabled={
            selectedSeat.length === 0 ||
            selectedDate === '' ||
            selectedTime === ''
          }
          style={[
            styles.checkoutBtn,
            {
              opacity:
                selectedSeat.length === 0 ||
                selectedDate === '' ||
                selectedTime === ''
                  ? 0.3
                  : 1,
            },
          ]}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          enablePanDownToClose={false}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,

                width: '100%',
                textAlign: 'center',
              }}>
              Checkout confirmation
            </Text>
          </View>
          <View
            style={{
              padding: 20,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: 'gray',
                  marginRight: 30,
                }}>
                Movie's Title:{' '}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  paddingRight: 15,
                  fontSize: 18,
                  width: '70%',
                  fontWeight: '500',
                  textAlign: 'right',
                }}>
                {movieName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'gray'}}>
                Time:
              </Text>
              <Text style={{fontSize: 18, fontWeight: '500'}}>
                {selectedDate + ' ' + selectedTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'gray'}}>
                Selected seats:
              </Text>
              <Text style={{fontSize: 18, fontWeight: '500'}}>
                {selectedSeat?.join(', ')}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 20,
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Total: </Text>
            <Text style={{fontSize: 24, fontWeight: '600'}}>
              {50 * selectedSeat.length + '$'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.close()}
              style={{
                borderColor: COLOR_ENUM.PRIMARY_COLOR,
                borderWidth: 2,
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 16,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleConfirmBooking();
              }}
              style={{
                backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 16,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalOpen(!modalOpen);
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR_ENUM.MODAL_TRANSPARENT,
          }}>
          {modalLoading ? (
            <ActivityIndicator
              color={COLOR_ENUM.PRIMARY_COLOR}
              size={'large'}
            />
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                flex: 0.3,
                width: '70%',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <SvgXml xml={svgBooking} />
              <Text style={{fontWeight: '600', fontSize: 16, margin: 20}}>
                Booking Success!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                  navigation.navigate('MyTicket');
                }}
                style={{
                  backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
                  paddingVertical: 15,
                  width: '100%',
                  borderRadius: 24,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  View booked tickets
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </BottomSheetModalProvider>
  );
};

export default SelectDateTimeComponent;

const styles = StyleSheet.create({
  selectTimeCtn: {
    flex: 1,
    // height: 600,
    backgroundColor: COLOR_ENUM.DARK_MODE,
    marginTop: 20,
    borderRadius: 24,
    padding: 15,
  },
  selectTitle: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    fontWeight: '600',
    marginBottom: 20,
  },
  timeItem: {
    backgroundColor: '#282828',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginHorizontal: 10,
    borderRadius: 24,
    marginBottom: 20,
  },
  timeItemText: {
    color: 'gray',
  },
  dateItem: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
    marginBottom: 0,
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: COLOR_ENUM.PRIMARY_COLOR,
    paddingVertical: 20,
    borderRadius: 24,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
});

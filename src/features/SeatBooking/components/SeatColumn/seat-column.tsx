import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR_ENUM} from '../../../../libraries/ENUMS/ColorEnum';
import {seatDetail} from '../../mockSeatsData';

type Props = {
  seatList: seatDetail[];
  selectedSeats: string[];
  setSelectedSeat: React.Dispatch<React.SetStateAction<string[]>>;
};

const SeatColumnComponent = (props: Props) => {
  const {seatList, selectedSeats, setSelectedSeat} = props;
  return (
    <View style={styles.seatListColumn}>
      <FlatList
        data={seatList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (
                selectedSeats.includes(item.row + item.column) &&
                !item.reserved
              ) {
                setSelectedSeat(prev =>
                  prev.filter(selected => selected !== item.row + item.column),
                );
              } else {
                setSelectedSeat(prev => [...prev, item.row + item.column]);
              }
            }}
            style={[
              styles.seatCells,
              {
                backgroundColor: item.reserved
                  ? '#8A2A0E'
                  : selectedSeats.includes(item.row + item.column)
                  ? COLOR_ENUM.PRIMARY_COLOR
                  : 'transparent',
              },
            ]}>
            <Text style={styles.seatCellsText}>{item.row + item.column}</Text>
          </TouchableOpacity>
        )}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SeatColumnComponent;

const styles = StyleSheet.create({
  seatListColumn: {
    width: '45%',
    // height: 200,
  },
  seatCells: {
    width: '20%',
    height: 30,
    marginRight: '6%',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#8A2A0E',
    borderWidth: 1,
    justifyContent: 'center',
  },
  seatCellsText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

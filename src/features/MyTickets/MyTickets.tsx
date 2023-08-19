import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const MyTickets = (props: Props) => {
  return (
    <SafeAreaView style= {{
      flex:1,
      backgroundColor:"#000"
    }} >
      <Text>MyTickets</Text>
    </SafeAreaView>
  )
}

export default MyTickets

const styles = StyleSheet.create({})
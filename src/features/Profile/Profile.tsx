import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
  return (
    <SafeAreaView style= {{
      flex:1,
      backgroundColor:"#000"
    }}>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
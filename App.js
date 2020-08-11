// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, Text } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq0tkDn6nhRcMmiFJ9VcQU6tHoVtSPkjY",
  authDomain: "react-native-chat-ham7a.firebaseapp.com",
  databaseURL: "https://react-native-chat-ham7a.firebaseio.com",
  projectId: "react-native-chat-ham7a",
  storageBucket: "react-native-chat-ham7a.appspot.com",
  messagingSenderId: "1074315057253",
  appId: "1:1074315057253:web:935e446ddb6f11ac9e0e8c"
};
// Initialize Firebase
if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatRef = db.collection('chats')

export default function App() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')

  useEffect(() => {
    readUser()
    const unsubscribe = chatRef.onSnapshot(querySnapshot => {
      const massageFirestore = querySnapshot.docChanges().filter(({type}) => type === 'added')
      .map(({doc}) => {
        const message
      })
    })
  }, [])

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
        setUser(JSON.parse(user))
    }
  }

  async function handlePress() {
    const _id = Math.random().toString(36).substring(7)
    const user = { _id, name }
    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  if (!user) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
            <Button onPress={handlePress} title="Enter the chat" />
        </View>
    )
}
  return (
    <View style={styles.container}>
      <Text>We have a user</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
  },
  input: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      padding: 15,
      marginBottom: 20,
      borderColor: 'gray',
  },
})

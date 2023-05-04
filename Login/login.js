import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { initializeApp } from "firebase/app";

import {collection, getFirestore, query, where, onSnapshot} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCEQSj2zFjay1NfheJxgpzcjIUHn4KSCsI",
  authDomain: "test1-c625a.firebaseapp.com",
  projectId: "test1-c625a",
  storageBucket: "test1-c625a.appspot.com",
  messagingSenderId: "286115849930",
  appId: "1:286115849930:web:e7d292e91dc49a204af633"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const Login = ({ navigation}) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [message, setMessage] = React.useState("")
  function verify(){
    const colref = collection(db, 'users')
    const q = query(colref, where("Email", "==", email));
    onSnapshot(q, (snapshot) => {
      let users = []
      snapshot.docs.forEach((doc) => {
        users.push({...doc.data(), id: doc.id})
      })
      if (email == "" || password == "")
        setMessage("At least one of the fields is empty")
      else if (users.length != 0 && users[0].Password == password)
        navigation.navigate('Main', {id:users[0].id});
      
      else setMessage("Invalid email or password")
    })
  }

  return (
      <View style={styles.centerizedView}>
        <View style={styles.authBox}>
          <View style={styles.logoBox}>
            <Icon
              color='#27251F'
              name='login'
              type='material-community-icons'
              size={50}
            />
          </View>
          <Text style={styles.loginTitleText}>Login</Text>
          <View style={styles.hr}></View>
          <View style={styles.inputBox}>
            <TextInput
              mode='outlined'
              outlineColor='#27251F'
              activeOutlineColor='#FFC72C'
              label={<Text style={styles.inputLabel}>Email</Text>}
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType='email-address'
              textContentType='emailAddress'
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              mode='outlined'
              outlineColor='#27251F'
              activeOutlineColor='#FFC72C'
              label={<Text style={styles.inputLabel}>Password</Text>}
              style={styles.input}
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={true}
              textContentType='password'
            />
          </View>
          <Button mode="contained" style={styles.loginButton} onPress={verify}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Button>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  centerizedView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  authBox: {
    width: '80%',
    backgroundColor: '#DA291C',
    top: '10%',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 75,
    height: 75,
    backgroundColor: '#FFC72C',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -25,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#27251F',
    marginTop: 12,
  },
  inputBox: {
    marginTop: 25,
  },
  inputLabel: {
    fontSize: 16
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    color: '#27251F',
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FFC72C',
    paddingVertical: 5,
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  message: {
    color: '#FFC72C',
    textAlign: 'center',
  },
});
export default Login;
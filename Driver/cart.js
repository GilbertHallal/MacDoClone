import { useState, useEffect, useRef }  from 'react';
import { View, FlatList, Text,
    ScrollView, SafeAreaView, StyleSheet } from 'react-native';
    
import { Button } from 'react-native-paper';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { initializeApp } from "firebase/app";
import {collection, getFirestore, addDoc} from 'firebase/firestore'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

const Cart = ({route, navigation}) => {
    
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
    const {list, id} = route.params

    let total = 0;
    for (let index = 0; index < list.length; index++) {
        total += Number(list[index].price);
        
    }

    function nv() {
        
        const colref = collection(db, 'purchases')
        addDoc(colref, {
          userID: id,
          Total: total,
          Date: new Date().toDateString(),
        })
        .then(() => {
            navigation.navigate('Menu', {list:[], id: id})
        })
        
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'#fff'
        },
        item: {
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          flex:1,
          flexDirection: 'row'
        },
        header: {
            textAlign: 'center',
            marginTop: 10,
            flex: 1,
            flexDirection: 'column',
            borderColor: '#DA291C',
            borderWidth: 12,
            borderTopRightRadius: 10,
            borderToLeftRadius: 10,
            backgroundColor: '#FFC72C'
        },
        text: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#27251F'
        },
        headertext: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#27251F'
          },
        buttonStyle: {
          alignItems: 'center',
          backgroundColor: '#DA291C',
          margin: 5,
        },
        buttonTextStyle: {
          fontSize: 20,
          color: '#FFC72C'
        },
        name:{
            width: '65%'
        },
        price: {
            width: '34%'
        },
        bill:{
            borderColor: '#DA291C',
            borderWidth: 12,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: '#FFC72C',
            width: '100%'
        }
        
      });
    
    const Item = (item) => (

        <View style={styles.item}>
            <View style={styles.name}>
                <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={styles.price}>
                <Text style={styles.text}>{item.price}$</Text>
            </View>
        </View>
      );

      async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Mcdonald's",
            body: 'Your purchase was successful',
            data: { data: 'goes here' },
          },
          trigger: { seconds: 1 },
        });
        nv()
      }
        
    
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={{height:'100%'}}>
        <View style={styles.header}>
            <View style={{width: '100%'}}>
                <Text style={styles.headertext}>Your cart</Text>
            </View>
            <View style={{width: '100%'}}>
                <Text style={styles.headertext}>Item           Price</Text>
            </View>
        </View>
        <View style={styles.bill}>
            <FlatList
                data={list}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => Item(item)}
            />
            <View style={styles.item}>
              <View style={styles.name}>
                  <Text style={styles.text}>Total</Text>
              </View>
            <View style={styles.price}>
                <Text style={styles.text}>{total}$</Text>
            </View>
            </View>
        </View>
        
       
        <Button mode="contained" style={styles.buttonStyle}
         onPress={async () => {
          await schedulePushNotification();
        }}>    
            <Text style={styles.buttonTextStyle}>Pay</Text>
        </Button>
        
        </ScrollView>
    </SafeAreaView>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
export default Cart;
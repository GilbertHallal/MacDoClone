import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, 
    ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Text,Button, TextInput } from 'react-native-paper';    
import { initializeApp } from "firebase/app";
import {collection, getFirestore, query, where, onSnapshot} from 'firebase/firestore'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker';

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

const Account = ({route}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [data, setData] = useState([])
  const [mapRegion, setMapRegion] = useState({
    latitude: 133.92942,
    longitude: 135.681471,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const userLocation = async () =>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted')
    {
      setErrorMsg('Permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
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
      flexDirection: 'column'
    },
    purchase: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flex:1,
      flexDirection: 'row'
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#27251F',
      textAlign: 'center'
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#FFC72C',
      margin: 5,
      paddingVertical: 5,
    },
    buttonTextStyle: {
      fontSize: 20,
      color: '#fff'
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
      borderRadius: 10,
      backgroundColor: '#FFC72C',
      width: '100%',
      maxHeight: 180,
      marginBottom: 10
    },
    inputBox: {
      marginBottom: 10,
    },
    inputLabel: {
      fontSize: 16,
    },
    input: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 16,
      color: '#27251F',
    },
    personal:{
      borderRadius: 10,
      backgroundColor: '#DA291C',
      width: '100%',
      marginTop: 20
    },
    insidePer:{  
      alignSelf: 'center',
      width:'80%'
    },
    map:{
      width:'100%',
      height:250
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#27251F',
      textAlign: 'center'
    },
    image: {
      width:280,
      height: 210,
      
    }
    
  });
  const {id} = route.params;
  
  useEffect(() => {
    
    const colref = collection(db, 'purchases')
    const q = query(colref, where("userID", "==", id));
    onSnapshot(q, (snapshot) => {
      let purchases = []
      snapshot.docs.forEach((doc) => {
        purchases.push({...doc.data(), id: doc.id})
      
      })
      setData(purchases)})
  }, []);
  

    const Item = (item) => (

      <View style={styles.purchase}>
          <View style={styles.name}>
              <Text style={styles.text}>{item.Date}</Text>
          </View>
          <View style={styles.price}>
              <Text style={styles.text}>{item.Total}$</Text>
          </View>
      </View>
    );
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.item}>
          <View style={styles.personal}>
          <Text style={styles.header}>
            Personal Information
          </Text>
          <View style={styles.insidePer}>
          <View>
            <MapView style={styles.map} region={mapRegion}>
              <Marker coordinate={mapRegion} title='Marker'/>
            </MapView>
            <Button mode="contained" style={styles.buttonStyle} onPress={userLocation}>    
              <Text style={styles.buttonTextStyle}>Get Location</Text>
            </Button>
          </View>
          <View>
            {image ? <Image source={{ uri: image }} style={styles.image} />:
            <Image source={require('../assets/download.jpg')} style={styles.image}/>}
            
            <Button mode="contained" style={styles.buttonStyle} onPress={pickImage}>    
              <Text style={styles.buttonTextStyle}>Get Image</Text>
            </Button>
          </View>
            <View style={styles.inputBox}>
            <TextInput
              mode='outlined'
              outlineColor='#27251F'
              activeOutlineColor='#FFC72C'
              label={<Text style={styles.inputLabel}>First Name</Text>}
              style={styles.input}
              keyboardType= 'default'
              textContentType='name'
            />
            </View>
          <View style={styles.inputBox}>
              <TextInput
                mode='outlined'
                outlineColor='#27251F'
                activeOutlineColor='#FFC72C'
                label={<Text style={styles.inputLabel}>Family Name</Text>}
                style={styles.input}
                keyboardType= 'default'
                textContentType= 'familyName'
              />
          </View>
          </View>
        </View>
        <Text style={styles.text}>Previous Purchases</Text>
          <View style={styles.purchase} >
            <View style={styles.name}>
                <Text style={styles.text}>Date</Text>
            </View>
            <View style={styles.price}>
                <Text style={styles.text}>Total</Text>
            </View>
          </View>
          <View style={styles.bill}>
            
          <FlatList
            data={data.slice(0,5)}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => Item(item)}
              />
          </View>
          
          
          
          </ScrollView>
      </SafeAreaView>
      );
}

export default Account


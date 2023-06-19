import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text,
   ScrollView, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { Button } from 'react-native-paper';

const Menu = ({route, navigation}) => {
  navigation.setOptions({ headerLeft: null});
  let purchases = [];
  const { list, id } = route.params;
  purchases = list;
  function nv()
  {
    if (purchases.length != 0)
      navigation.navigate("Cart", {list: purchases, id:id})
  }
  const handlePress = (item) =>
  {
    navigation.navigate('Details',{
    item: item,
    list: purchases,
    id:id});
    
  }
  const url = 'https://burgers-hub.p.rapidapi.com/burgers';
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': 'APIKEY',
      'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
    }
    
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#fff'
    },
    innerContainer: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 30,
      borderColor: '#DA291C',
      borderWidth: 12,
      borderRadius: 10,
      backgroundColor: '#FFC72C'
    },
    image: {
      padding: 10,
      margin: 5,
      height: 150,
      width: 300,
      resizeMode: 'stretch'
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#27251F'
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#FFC72C',
      borderWidth: 0.5,
      borderColor: '#DA291C',
      borderWidth: 12,
      height: 240,
      borderRadius: 5,
      margin: 5,
      },
    cartButton: {
      alignItems: 'center',
      backgroundColor: '#DA291C',
      margin: 5,
    },
    buttonTextStyle: {
      fontSize: 20,
      color: '#FFC72C'
    }
  });

const renderButton = (item) => (

    <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}
     onPress={() => handlePress(item)} keyExtractor={(item) => item}>
          <Image
            source={{uri: item.images[1].lg}}
            style={styles.image}
          />
          <Text style={styles.text}>{item.name} {item.price}$</Text>
    </TouchableOpacity>
  );

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => renderButton(item)}
        />
      )}
      <Button mode="contained" style={styles.cartButton}onPress={nv}>
      <Text style={styles.buttonTextStyle}>View Cart</Text>
      </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

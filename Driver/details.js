import React from 'react';
import { Text,  Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

import { Button } from 'react-native-paper';


const Details = ({route, navigation}) => {
  

  const { item, list, id } = route.params;
  navigation.setOptions({ title: item.name })
  let purchases = list;
  const handlePress = (item) =>
  {
    purchases.push(item)
    navigation.navigate('Menu',{list: purchases, id:id});
    
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#fff'
    },
    innerContainer: {
      flex: 1,
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    image: {
      padding: 10,
      margin: 5,
      height: 150,
      width: 300,
      resizeMode: 'stretch',
    },
    text: {
      fontSize: 15,
      fontWeight: 'light',
      marginBottom: 20,
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
    }
    
  });

  const renderIngredient = (ingredient) => (
    <Text style={styles.text}>{`\u2022 ${ingredient.name}`}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
      <Image
            source={{uri: item.images[1].lg}}
            style={styles.image}
          />
      <Text style={styles.text}>{item.desc}</Text>
      <Button mode="contained" style={styles.buttonStyle}
        onPress={() => handlePress(item)} keyExtractor={(item) => item}>
      <Text style={styles.buttonTextStyle}>Add to Cart</Text>
      </Button>
      
      </ScrollView>
    </SafeAreaView>
  );
};



export default Details;

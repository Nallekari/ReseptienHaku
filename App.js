
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState([]);
 
  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(responseJson => {
        setRecipes(responseJson.meals);
        setImages("" + responseJson.strMealThumb);

      })
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image source={{ uri: item.strMealThumb }} style={{width:48,height:40,resizeMode:'contain'}}></Image>
          </View>}
        data={recipes} 
        ItemSeparatorComponent={listSeparator} /> 
      <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  
  tinyPic: {
    width: 24,
    height: 24,
  }

  
});
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain_mobile } from '../domain';



function MyCars({ navigation }) {


  const [cars, setCars] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(domain_mobile + "/api/get_cars", { headers: { "authorization": "Token " + token } });
        setCars(res.data);
      }
      catch (err) {
        console.log(err);
      }


    })();
  }, [navigation])

  const deleteCar = async (obj) => {
    try {
        const token = await AsyncStorage.getItem("token");
        await axios.post(domain_mobile + "/api/delete_cars", {"id": obj.id},
        {headers: {
          "Authorization": "Token " + token
        }});
        const carIndex = cars.indexOf(obj);
        setCars([...cars.slice(0, carIndex), ...cars.slice(carIndex + 1, )]);
    }catch (err) {
      console.log(err);
    }
  }



  const carView = ({item}) => {
    console.log(item);
    return (
      <View style={styles.gradient_background_padding}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.text}>{item.body}</Text>
          <Text style={styles.bold_text}>{item.number}</Text>
          <View style={styles.btn_edit}>
            <TouchableOpacity onPress={() => navigation.navigate('AddEditCar', {"body": item.body, "number":item.number, "id": item.id, "title": "Редактирование авто"})} activeOpacity={0.7} style={{ marginRight: '5%' }}>
              <SimpleLineIcons name='pencil' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => deleteCar(item)}>
              <Ionicons name='trash-outline' size={28} color={'#AE0000'} />
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient colors={['#00266F', '#7BCFD6']} start={[1, 0]} style={styles.gradient_line} />
      </View>)
  }

  const EmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Нет машин</Text>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.main}>

        <LinearGradient
          colors={['#01010199', '#35343499']}
          start={[0, 1]}
          style={styles.gradient_background} >
          <FlatList
            data={cars}
            ListEmptyComponent={<EmptyComponent />}
            keyExtractor={item => item.id}
            renderItem={carView}
          />
        </LinearGradient>

      </View>
    </SafeAreaView>
  );
}

export default MyCars

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6E7476',
    flex: 1,
  },
  main: {
    padding: '5%',
  },
  // конец главного контейнера


  text: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat_400Regular'
  },
  bold_text: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat_700Bold'
  },


  gradient_background: {
    borderRadius: 5,
  },
  gradient_line: {
    marginTop: '5%',
    height: 2,
    borderRadius: 5,
  },
  gradient_background_padding: {
    padding: '5%',
  },
  btn_edit: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },

})

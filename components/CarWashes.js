import React, { useCallback, useMemo, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Button, View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, Image, Alert, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import { domain_mobile, domain_web } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location"
import { getDistance } from "geolib"
import { Picker } from '@react-native-picker/picker';





function CarWashes({ navigation, route }) {

  const [washes, setWashes] = useState([]);
  const [stock, setStock] = useState([]);
  const [countCar, setCountCar] = useState(0);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [locations, setLocations] = useState([]);
  const [bView, setBVeiw] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CarFilters', { 'sorted': route.params == undefined ? 0 : route.params.sorted, "filters": route.params == undefined ? [] : route.params.filters })} activeOpacity={0.7}>
          <FontAwesome name='filter' size={28} color={'#7CD0D7'} />
        </TouchableOpacity>
      )
    });
    (async () => {
      if (route.params == undefined) {
        await navigation.setParams({
          sorted: 0,
          filters: []
        });
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Not location");
      }
      const col = await Location.getLastKnownPositionAsync();
      setCoords({ latitude: col.coords.latitude, longitude: col.coords.longitude })
      try {
        const ret = await axios.get(domain_web + "/get_country")
        setLocations(ret.data.country)
        const location = await AsyncStorage.getItem("location");
        if (location != null) {
          setLocation(location)
        }
        else {
          setLocation(ret.data.country[0]);
        }
        const phone = await AsyncStorage.getItem("phone");
        const res = await axios.get(domain_web + "/get_catalog",
          {
            params: {
              filter: route.params == undefined ? [] : route.params.filters,
              sorted: route.params == undefined ? 0 : route.params.sorted,
              location: location == null ? ret.data.country[0] : location,
              phone: phone
            }
          }
        );
        setStock(res.data.stock);
        setWashes(res.data.washer);
        const token = await AsyncStorage.getItem("token");
        if (token != null) {
          const cars = await axios.get(domain_mobile + "/api/get_cars", { headers: { "Authorization": "Token " + token } });
          setCountCar(cars.data.length);
        } else {
          setCountCar(1)
        }


      }
      catch (err) {
        console.log(err);
      }
    })();
  }, [navigation]);


  const selectWasher = async (id, sale) => {
    if (countCar === 0) {
      Alert.alert("У вас еще нет машин!", "Для оформления заказа необходимо добавить машину у себя в профиле");
      return 0;
    }
    let keys = await AsyncStorage.getAllKeys()
    const stock = keys.filter(key => key.startsWith("stock"));
    for (let i = 0; i < stock.length; i++) {
      await AsyncStorage.removeItem(stock[i]);
    }
    const serv = keys.filter(key => key.startsWith("servise_"));
    for (let i = 0; i < serv.length; i++) {
      await AsyncStorage.removeItem(serv[i]);
    }
    await AsyncStorage.setItem("washer", id.toString());
    await AsyncStorage.setItem("sale", sale.toString());
    navigation.navigate("PointCarWash");
  }

  const [refreshing, setRefresing] = useState(false);



  const newLocation = async (value) => {
    setLoading(true);
    setLocation(value);
    await AsyncStorage.setItem("location", value);
    const phone = await AsyncStorage.getItem("phone");
    const res = await axios.get(domain_web + "/get_catalog",
      {
        params: {
          filter: route.params == undefined ? [] : route.params.filters,
          sorted: route.params == undefined ? 0 : route.params.sorted,
          location: value,
          phone: phone
        }
      }
    );
    setStock(res.data.stock);
    setWashes(res.data.washer);
    setLoading(false)
  }


  const refresh = async () => {
    setRefresing(true);
    try {
      const location = await AsyncStorage.getItem("location");
      setLocation(location)
      const phone = await AsyncStorage.getItem("phone");
      const res = await axios.get(domain_web + "/get_catalog",
        {
          params: {
            filter: route.params == undefined ? [] : route.params.filters,
            sorted: route.params == undefined ? 0 : route.params.sorted,
            location: location,
            phone: phone
          }
        }
      );
      setStock(res.data.stock);
      setWashes(res.data.washer);
      const token = await AsyncStorage.getItem("token");
      const cars = await axios.get(domain_mobile + "/api/get_cars", { headers: { "Authorization": "Token " + token } });
      setCountCar(cars.data.length);
      setRefresing(false)
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView style={styles.main}>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
        <Text style={styles.subtext}>местоположение</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setBVeiw(!bView)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '0%' }}>
            <Text style={styles.city}>{location}</Text>
            <Ionicons name='chevron-forward' size={24} style={{ color: '#7CD0D7' }} />
          </View>
        </TouchableOpacity>
        {bView &&
          <Picker
            selectedValue={location}
            itemStyle={{ height: 150 }}
            onValueChange={(value, index) => newLocation(value)}>
            {locations.map(obj => <Picker.Item color='#fff' key={obj} label={obj} value={obj} />)}
          </Picker>}

        <LinearGradient colors={['#00266F', '#7BCFD6']} start={[1, 0]} style={styles.gradient_line} />

        <LinearGradient
          colors={['#01010199', '#35343499']}
          start={[0, 1]}
          style={styles.gradient_background} >
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.stocks}>Акции</Text>
          </View>
          {stock.map((obj, ind) => {
            return (
              <TouchableOpacity key={ind} activeOpacity={0.7} style={styles.mt_TouchOpac}>
                <LinearGradient colors={['#FFF737', '#7CD0D7']} start={[1, 0]} style={styles.gradient_btn} >
                  <Text style={styles.subtext_stocks}>{obj.date}</Text>
                  <Text style={styles.text_stocks}>{obj.text}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )
          })}
        </LinearGradient>

        <View style={{ marginBottom: 50 }}>
          {!loading ? washes.map((obj, ind) => {
            return (
              <TouchableOpacity key={obj.id} onPress={() => selectWasher(obj.id, obj.sale)} activeOpacity={0.7} style={styles.mt_TouchOpac}>
                <LinearGradient
                  colors={['#01010199', '#35343499']}
                  start={[0, 1]}
                  style={styles.gradient_background} >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Image source={{ uri: domain_web + obj.avatar }} style={{ width: 100, height: 100 }} width={100} height={100} />
                    <View style={{ marginRight: '20%' }}>
                      <Text style={styles.stocks}>{obj.address}</Text>
                      <Text style={styles.text_in_item}>Скидка {obj.sale}%</Text>
                      <Text style={styles.text_in_item}>В {getDistance(coords, { latitude: parseFloat(obj.lat), longitude: parseFloat(obj.lon) })}м от вас</Text>
                    </View>
                    <LinearGradient colors={['#FFF73780', '#FFF97480']} start={[1, 0]} style={styles.rating} >
                      <Text style={styles.stocks}>{obj.rate.count_rate == 0 ? "0.00" : (obj.rate.mean_rate / obj.rate.count_rate).toFixed(2)}</Text>
                    </LinearGradient>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )
          }) : <ActivityIndicator /> }
        </View>

      </ScrollView>
      {/* <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View> */}
    </SafeAreaView>

  );
}

export default CarWashes

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6E7476',
    flex: 1,
  },
  main: {
    padding: '5%',
  },
  // конец главного контейнера




  subtext: {
    fontSize: 11,
    color: '#CBCBCB',
    fontFamily: 'Raleway_400Regular'
  },



  mt_TouchOpac: {
    marginTop: '5%',
  },
  gradient_background: {
    borderRadius: 5,
    padding: '5%',
  },
  gradient_btn: {
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: '4%',
    paddingHorizontal: '7%',
  },
  stocks: {
    marginTop: '0%',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway_700Bold',
    textTransform: 'uppercase',
  },
  subtext_stocks: {
    fontSize: 8,
    color: '#5A5A5A',
    fontFamily: 'Raleway_400Regular'
  },
  text_stocks: {
    marginTop: '3%',
    fontSize: 14,
    color: '#6E7476',
    fontFamily: 'Raleway_400Regular'
  },



  city: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Raleway_400Regular'
  },
  gradient_line: {
    marginTop: '3%',
    marginBottom: '5%',
    height: 2,
    borderRadius: 5,
  },






  text_in_item: {
    marginTop: '15%',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Raleway_400Regular'
  },
  rating: {
    borderRadius: 5,
    justifyContent: 'center',
    padding: '2%',
  },

})

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { CheckBox, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain_web } from '../domain';
import { Picker } from '@react-native-picker/picker';




function CarFilters({ navigation, route }) {

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState(["По расстоянию", "По рейтингу"]);
  const [bSort, setBSort] = useState(false);
  const [selectSort, setSelectSort] = useState(route.params.sorted);
  const [check, setCheck] = useState(route.params.filters);

  useLayoutEffect(() => {
    (async () => {
      const res = await axios.get(domain_web + "/get_filter");
      setFilters([...res.data, { name: "Безналичный расчет" }, { name: "Наличный расчет" }])
    })();
  }, [navigation])


  const setFilterCheck = (name) => {
    if (check.indexOf(name) == -1) {
      setCheck([...check, name]);
    }
    else {
      const index = check.indexOf(name);
      setCheck([...check.slice(0, index), ...check.slice(index + 1,)]);
    }
  }


  const sendFilters = () => {
      navigation.replace("CarWashes", {"sorted": selectSort, "filters":check})
  }


  return (
    <View style={styles.container}>
      <Image blurRadius={100} style={[StyleSheet.absoluteFill, styles.image]} source={require('../assets/images/blur_background.png')} resizeMode='cover' />
      {/* <BlurView intensity={100} style={styles.blurContainer}> */}
      <View style={styles.blurContainer}>
        <TouchableOpacity onPress={() => navigation.replace('CarWashes', {"sorted": 0, "filters":[]})} activeOpacity={0.7} style={{}}>
          <Ionicons name='close' size={28} color={'#7CD0D7'} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.bold_text}>Фильтр</Text>
        </View>

        <View>
          <LinearGradient
            colors={['#01010199', '#35343499']}
            start={[0, 1]}
            style={styles.gradient_background} >
            <TouchableOpacity activeOpacity={0.7} onPress={() => { setBSort(!bSort) }} style={styles.mt_TouchOpac}>
              <View >
                <Text style={styles.subtext}>сортировка</Text>
                <Text style={styles.text}>{sort[selectSort]}</Text>
              </View>
            </TouchableOpacity>
            {bSort && <Picker
              selectedValue={selectSort}
              onValueChange={(value, index) => setSelectSort(index)}>
              <Picker.Item label="Расстояние" value={0} />
              <Picker.Item label="Рейтинг" value={1} />
            </Picker>}
          </LinearGradient>
        </View>


        <LinearGradient
          colors={['#01010199', '#35343499']}
          start={[0, 1]}
          style={styles.gradient_background} >
          <View>
            <Text style={styles.subtext}>фильтры</Text>
            {filters.map((obj, id) => {
              return (
                <View key={id} style={styles.checkbox}>
                  <CheckBox containerStyle={{ padding: 0, margin: 0, marginRight: 0, marginLeft: 0 }}
                    checkedIcon={
                      <Icon name="radio-button-checked" type="material" color="#7BCFD6" size={25} />
                    }
                    uncheckedIcon={
                      <Icon name="radio-button-unchecked" type="material" color="#7BCFD6" size={25} />
                    }
                    checked={check.indexOf(obj.name) != -1}
                    onPress={() => setFilterCheck(obj.name)}
                  />
                  <Text style={styles.text_check}>{obj.name}</Text>
                </View>
              )
            })}
          </View>
        </LinearGradient>


        <TouchableOpacity activeOpacity={0.8} onPress={sendFilters} style={{ marginTop: '5%' }} >
          <ImageBackground source={require('../assets/images/button.png')} resizeMode='stretch' style={styles.bg_img} >
            <Text style={styles.text_btn} >Ок</Text>
          </ImageBackground>
        </TouchableOpacity>



        {/* </BlurView> */}
      </View>
    </View >
  );
}

export default CarFilters
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blurContainer: {
    flex: 1,
    padding: '5%',
    // padding: 20,
    // justifyContent: 'center',
  },
  bold_text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway_700Bold',
    textTransform: 'uppercase',
  },
  gradient_background: {
    marginTop: '5%',
    borderRadius: 5,
    padding: '5%',
  },
  subtext: {
    fontSize: 8,
    color: '#B2B2B2',
    fontFamily: 'Raleway_400Regular',
  },
  text: {
    marginTop: '2%',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Raleway_400Regular',
  },
  text_check: {
    marginLeft: '5%',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Raleway_400Regular',
  },
  checkbox: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: '5%',
  },


  text_btn: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Raleway_400Regular',
    textTransform: 'uppercase',
    paddingVertical: '5%',
  },
  bg_img: {
    alignItems: 'center',
  },
  // конец кнопки ок
});


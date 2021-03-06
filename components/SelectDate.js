import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { CheckBox, Icon } from 'react-native-elements';
import axios from 'axios';
import { domain_web } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';



function SelectDate({ navigation }) {
  const [check4, setCheck4] = useState(false);
  const [selectDay, setSelectDay] = useState();
  const [data, setData] = useState();
  const [selectTime, setSelectTime] = useState();
  const [bDay, setBDay] = useState(false);
  const [bTime, setBTime] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      const washer = await AsyncStorage.getItem("washer")
      const res = await axios.get(domain_web + "/" + washer + "/get_work_time");

      setData(res.data);
      if (Object.keys(res.data).length != 0) {
        setSelectDay(Object.keys(res.data)[0]);
        setSelectTime(res.data[Object.keys(res.data)[0]][0]);
      }else{
        Alert.alert("Ошибка", "У данной автомойки еще нет графика работ");
        navigation.navigate("CarWashes");
      }
    })();
  }, [navigation])


  const clickNext = async () => {
    await AsyncStorage.setItem("order_time", selectTime);
    await AsyncStorage.setItem("order_day", selectDay);
    navigation.navigate('SelectCar');
  }


  const goBack = async () => {
    let keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys.filter(key => key.startsWith("stock") || key.startsWith("servise_")))
    navigation.navigate('PriceListFor')
  }


  return (
    <View style={styles.container}>
      <Image blurRadius={91} style={[StyleSheet.absoluteFill, styles.image]} source={require('../assets/images/blur_background.png')} resizeMode='cover' />
      <View style={styles.blurContainer}>
        <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginTop: '5%', width: "100%" }]}>
          <TouchableOpacity onPress={goBack} activeOpacity={0.7} style={{ position: 'absolute', left: "3%", zIndex: 1 }}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
          </TouchableOpacity>
          <Text style={styles.bold_text}>Выберите дату записи</Text>
        </View>


        <LinearGradient
          colors={['#01010199', '#35343499']}
          start={[0, 1]}
          style={styles.gradient_background} >
          <TouchableOpacity activeOpacity={0.8} onPress={() => setBDay(!bDay)} >
            <View >
              <Text style={styles.subtext}>дата</Text>
              <Text style={styles.text}>{selectDay}</Text>
            </View>
          </TouchableOpacity>
          {bDay && <Picker
            selectedValue={selectDay}
            onValueChange={(value, index) => { setSelectDay(value); setSelectTime(data[value][0]) }}>
            {Object.keys(data).map((obj, ind) => <Picker.Item color='#fff' key={ind} label={obj} value={obj} />)}
          </Picker>}
        </LinearGradient>



        <LinearGradient
          colors={['#01010199', '#35343499']}
          start={[0, 1]}
          style={styles.gradient_background} >
          <TouchableOpacity activeOpacity={0.8} onPress={() => setBTime(!bTime)} >
            <View >
              <Text style={styles.subtext}>время</Text>
              <Text style={styles.text}>{selectTime}</Text>
            </View>
          </TouchableOpacity>
          {bTime && <Picker
            selectedValue={selectTime}
            onValueChange={(value, index) => { setSelectTime(value) }}>
            {data[selectDay].map((obj, ind) => <Picker.Item color='#fff' key={ind} label={obj} value={obj} />)}
          </Picker>}
        </LinearGradient>


        <TouchableOpacity activeOpacity={0.8} onPress={clickNext} style={{ marginTop: '5%' }} >
          <ImageBackground source={require('../assets/images/button.png')} resizeMode='stretch' style={styles.bg_img} >
            <Text style={styles.text_btn} >Далее</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectDate

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
    textAlign: 'center',
  },
  gradient_background: {
    marginTop: '5%',
    borderRadius: 5,
    padding: '5%',
  },
  subtext: {
    fontSize: 11,
    color: '#B2B2B2',
    fontFamily: 'Montserrat_400Regular',
  },
  text: {
    marginTop: '2%',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat_400Regular',
  },

  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'
  },


  text_btn: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat_400Regular',
    textTransform: 'uppercase',
    paddingVertical: '5%',
  },
  bg_img: {
    alignItems: 'center',
  },
  // конец кнопки
});


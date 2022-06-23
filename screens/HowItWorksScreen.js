import { View, Image, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import React, { useLayoutEffect, useState, useRef } from 'react';
import Swiper from 'react-native-swiper'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel, { Pagination } from 'react-native-snap-carousel';


function HowItWorksScreen({ navigation }) {

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videos, setVideos] = useState([["Авторизация", ""], ["Оформление заказа", ""], ["Добавление авто", ""]]);
  const [selectSnap, setSelectSnap] = useState(0);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'КАК ЭТО РАБОТАЕТ?',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: '#6E7476',
      },
      headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      //   fontFamily: 'Raleway_700Bold',
      // },
      headerLeft: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={28} color={'#7CD0D7'} />
        </TouchableOpacity>
      )
    });
    (async () => {
      await AsyncStorage.setItem("first_join_app", "true");
    })();
  }, [navigation]);

  const horizontalCarousel = ({ item, index }) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
        <Video
          ref={video}
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <Carousel
          data={videos}
          style={{ flex: 1 }}
          renderItem={horizontalCarousel}
          sliderWidth={Dimensions.get("window").width * 0.9}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={(ind) => { setSelectSnap(ind); }}
        />
      <View style={{flex:1 }} >
        <Text>{videos[selectSnap][0]}</Text>
        <Pagination
          activeDotIndex={selectSnap}
          dotsLength={videos.length}
          containerStyle={{ height: '100%' }}
          // dotColor='#7BCFD6'
          dotStyle={{ backgroundColor: '#7BCFD6', width: 15, height: 15, borderRadius: 50 }}
          dotContainerStyle={{ height: '5%' }}
        />
      </View>
    </View>



    // <Swiper style={styles.wrapper} showsButtons={false}>
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
    //     <Video
    //       ref={video}
    //       style={{ height: "50%", width: "100%" }}
    //       source={{
    //         uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //       }}
    //       useNativeControls
    //       resizeMode="contain"
    //       isLooping
    //       onPlaybackStatusUpdate={status => setStatus(() => status)}
    //     />
    //   </View>
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
    //     <Video
    //       ref={video}
    //       style={{ height: "50%", width: "100%" }}
    //       source={{
    //         uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //       }}
    //       useNativeControls
    //       resizeMode="contain"
    //       isLooping
    //       onPlaybackStatusUpdate={status => setStatus(() => status)}
    //     />
    //   </View>
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
    //     <Video
    //       ref={video}
    //       style={{ height: "50%", width: "100%" }}
    //       source={{
    //         uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //       }}
    //       useNativeControls
    //       resizeMode="contain"
    //       isLooping
    //       onPlaybackStatusUpdate={status => setStatus(() => status)}
    //     />
    //   </View>
    // </Swiper>
  );
}

export default HowItWorksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6E7476',
    alignItems: "center",
  },
  img: {
    height: '100%',
    width: '100%'
  },
})
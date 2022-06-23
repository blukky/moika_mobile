import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { DrawerActions } from '@react-navigation/native';


function MapScreen({ navigation }) {
  return (
    <View>
      <SafeAreaView style={styles.map_btn}>
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{}} >
            <Image source={require('../assets/images/map_main.png')} style={styles.bg_img} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AnsQues')} style={{}} >
            <Image source={require('../assets/images/map_faq.png')} style={styles.bg_img} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end', padding: '5%', }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('OrderDetails')} style={{marginBottom: '5%'}} >
            <Image source={require('../assets/images/map_route.png')} style={styles.bg_img} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('OrderDetails')} style={{}} >
            <Image source={require('../assets/images/map_navigation.png')} style={styles.bg_img} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Image style={styles.img} source={require('../assets/images/map.png')} />
    </View>
  );
}

export default MapScreen

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%'
  },
  map_btn: {
    position: 'absolute', zIndex: 1, 
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    width: '100%', padding: '5%',
  },
})
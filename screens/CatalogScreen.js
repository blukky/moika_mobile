import CarWashes from '../components/CarWashes';
import CarFilters from '../components/CarFilters';
import PointCarWash from '../components/PointCarWash';
// import MakingOrder from '../components/MakingOrder';
// import GeneralPriceList from '../components/GeneralPriceList';

import MakingOrderScreen from '../components/MakingOrderScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

function CatalogScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarWashes" component={CarWashes} options={{
        // headerShown: false,
        // headerBackTitleVisible: true,
        title: 'АВТОМОЙКИ',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          // fontWeight: 'bold',
          fontFamily: 'Raleway_700Bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="PointCarWash" component={PointCarWash} options={{
        title: 'АВТОМОЙКА 1',
        // headerShown: false,
        // headerBackTitleVisible: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textTransform: 'uppercase',
          // fontWeight: 'bold',
          fontFamily: 'Raleway_700Bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('CarWashes')} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }} >
        <Stack.Screen name="CarFilters" component={CarFilters} options={{
          headerShown: false,
          contentStyle: { opacity: 1 },
        }} />
      </Stack.Group>
      {/* 
        <Stack.Group screenOptions={{ presentation: 'modal' }} >
          <Stack.Screen name="MakingOrder" component={MakingOrder} options={{
          headerShown: false,
          contentStyle:{opacity:1},
          }} />
          <Stack.Screen name="GeneralPriceList" component={GeneralPriceList} options={{
          headerShown: false,
          contentStyle:{opacity:1},
          }} />
        </Stack.Group> */}

      <Stack.Screen name="MakingOrderScreen" component={MakingOrderScreen} options={{
        presentation: 'modal',
        headerShown: false,
        // headerShown: false,
        // headerBackTitleVisible: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textTransform: 'uppercase',
          // fontWeight: 'bold',
          fontFamily: 'Raleway_700Bold',
        },
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.navigate('CarWashes')} activeOpacity={0.7}>
        //     <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
        //     </TouchableOpacity>
        // ),
        // headerRight: () => (
        //   <TouchableOpacity onPress={() => navigation.navigate('MakingOrder')} activeOpacity={0.7}>
        //     <Ionicons name='cart-outline' size={28} color={'#7CD0D7'} />
        //   </TouchableOpacity>
        // ),
      }} />


    </Stack.Navigator>
  );
}

export default CatalogScreen

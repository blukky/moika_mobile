// import * as React from 'react';
import PersonalAccount from '../components/PersonalAccount';
import MyCars from '../components/MyCars';
import MyOrders from '../components/MyOrders';
import MyCards from '../components/MyCards';
import OrderDetails from '../components/OrderDetails';
import AddEditCard from '../components/AddEditCard';
import AddEditCar from '../components/AddEditCar';
import EvaluateService from '../components/EvaluateService';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

function PersonalAccountScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PersonalAccountScreen" component={PersonalAccount} options={{
        title: 'ЛИЧНЫЙ КАБИНЕТ',
        // headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Raleway_700Bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="MyCars" component={MyCars} options={{
        title: 'МОИ АВТО',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',
        },
        headerTitleStyle: {
          color: '#fff',
          textTransform: 'uppercase',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("PersonalAccountScreen")} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('AddEditCar', {"body": "", "number": "", "id": null, "title": "Добавление авто"})} activeOpacity={0.7}>
            <AntDesign name='pluscircleo' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="MyOrders" component={MyOrders} options={{
        title: 'МОИ ЗАКАЗЫ',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',
        },
        headerTitleStyle: {
          color: '#fff',
          textTransform: 'uppercase',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('PersonalAccountScreen')} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('CarWashes')} activeOpacity={0.7}>
            <AntDesign name='pluscircleo' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
      }} />

      {/* <Stack.Screen name="MyCards" component={MyCards} options={{
        title: 'МОИ КАРТЫ',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',
        },
        headerTitleStyle: {
          color: '#fff',
          textTransform: 'uppercase',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('PersonalAccountScreen')} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('AddEditCard')} activeOpacity={0.7}>
            <AntDesign name='pluscircleo' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
      }} /> */}

      <Stack.Screen name="OrderDetails" component={OrderDetails} options={{
        title: 'ПОДРОБНОСТИ ЗАКАЗА',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#6E7476',
        },
        headerTitleStyle: {
          color: '#fff',
          textTransform: 'uppercase',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('MyOrders')} activeOpacity={0.7}>
            <Ionicons name='chevron-back' size={28} color={'#7CD0D7'} />
            </TouchableOpacity>
        ),
      }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }} >
          <Stack.Screen name="AddEditCard" component={AddEditCard} options={{
          headerShown: false,
          }} />
        </Stack.Group> */}
      <Stack.Group screenOptions={{ presentation: 'modal' }} >
          <Stack.Screen name="AddEditCar" component={AddEditCar} options={{
          headerShown: false,
          }} />
        </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }} >
          <Stack.Screen name="EvaluateService" component={EvaluateService} options={{
          headerShown: false,
          }} />
        </Stack.Group>
    </Stack.Navigator>
  );
}

export default PersonalAccountScreen

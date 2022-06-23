// import * as React from 'react';
import Feedback from '../components/Feedback';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function FeedbackScreen({ navigation }) {

  return (
    <Stack.Navigator>
        <Stack.Screen name="FeedbackScreen" component={Feedback} options={{
          title: 'ОБРАТНАЯ СВЯЗЬ',
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#7BCFD6',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontFamily: 'Raleway_700Bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={0.7}>
              <Ionicons name='chevron-back' size={28} color={'#000000'} />
              </TouchableOpacity>
          ),
        }} />
      </Stack.Navigator>
  );
}

export default FeedbackScreen

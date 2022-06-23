// import CarWashes from '../components/CarWashes';
// import CarFilters from '../components/CarFilters';
// import PointCarWash from '../components/PointCarWash';
import MakingOrder from './MakingOrder';
import GeneralPriceList from './GeneralPriceList';
import PriceListFor from './PriceListFor';
import SelectDate from './SelectDate';
import SelectCar from './SelectCar';
import AddCarInMakingOrder from './AddCarInMakingOrder';
import SelectPaymentMethod from './SelectPaymentMethod';
import OrderСompletion from './OrderСompletion';

// import SuccessfulOrderScreen from './SuccessfulOrderScreen';
// import MainMenuScreen from '../screens/MainMenuScreen';

// import MakingOrderScreen from '../components/MakingOrderScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useWindowDimensions, TouchableOpacity } from 'react-native';
// import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';





const Stack = createNativeStackNavigator();

function MakingOrderScreen({ navigation }) {
  return (
    <Stack.Navigator>

          {/* <Stack.Screen name="MakingOrder" component={MakingOrder} options={{
          headerShown: false,
          }} /> */}

          <Stack.Screen name="GeneralPriceList" component={GeneralPriceList} options={{
          headerShown: false,
          }} />

          <Stack.Screen name="PriceListFor" component={PriceListFor} options={{
          headerShown: false,
          }} />

          <Stack.Screen name="SelectDate" component={SelectDate} options={{
          headerShown: false,
          }} />

          <Stack.Screen name="SelectCar" component={SelectCar} options={{
          headerShown: false,
          }} />
          {/* <Stack.Screen name="AddCarInMakingOrder" component={AddCarInMakingOrder} options={{
          headerShown: false,
          }} /> */}

          <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} options={{
          headerShown: false,
          }} />

          <Stack.Screen name="OrderСompletion" component={OrderСompletion} options={{
          headerShown: false,
          }} />
          
      </Stack.Navigator>
  );
}

export default MakingOrderScreen

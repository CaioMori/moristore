import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;

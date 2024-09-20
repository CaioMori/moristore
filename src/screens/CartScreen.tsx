import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Product} from '../service/ProductsService';
import {cartStore} from '../database/Store';
import SeparatorComponent from '../components/SeparatorComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 36,
    color: 'green',
    alignSelf: 'flex-end',
  },
  productImage: {
    aspectRatio: 1,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});

const CartScreen = () => {
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);

  const handleFetchCart = useCallback(() => {
    const productsFromCart = cartStore.getAllKeys();
    if (productsFromCart && productsFromCart.length > 0) {
      productsFromCart.forEach(product => {
        const productData = cartStore.getString(product);
        if (productData) {
          setStoredProducts(prevProducts => [
            ...prevProducts,
            JSON.parse(productData),
          ]);
        }
      });
    }
  }, []);

  useEffect(() => {
    handleFetchCart();
  }, [handleFetchCart]);

  return (
    <View style={styles.container}>
      <FlatList
        data={storedProducts}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={SeparatorComponent}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image
              source={{uri: item.image}}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CartScreen;

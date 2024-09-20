import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';
import {getProducts, Product} from '../service/ProductsService';
import SeparatorComponent from '../components/SeparatorComponent';
import {cartStore} from '../database/Store';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../service/LoginService';

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

const ProductScreen = () => {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    const productsResponse = await getProducts();
    setProducts(productsResponse);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    cartStore.set(product.title, JSON.stringify(product));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <View style={styles.container}>
      <View>
        <Button title="Logout" onPress={logout} />
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={SeparatorComponent}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image
              source={{uri: item.image}}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Button title="Add to cart" onPress={() => handleAddToCart(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default ProductScreen;

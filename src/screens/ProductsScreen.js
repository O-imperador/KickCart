import { StyleSheet, View, Image, FlatList, Pressable, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productsSlice';

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  const handlePress = (item) => {
	// update product selected
	dispatch(productsSlice.actions.setSelectedProduct(item.id));
	navigation.navigate('Product Details');
  };

  const renderItem = ({ item }) => (
	<Pressable onPress={() => handlePress(item)} style={styles.itemContainer}>
	  <Image source={{ uri: item.image }} style={styles.image} />
	  <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
	</Pressable>
  );

  return (
	<View style={styles.container}>
	  <FlatList
		data={products}
		renderItem={renderItem}
		numColumns={2}
		keyExtractor={(item) => String(item.id)}
		contentContainerStyle={styles.list}
	  />
	</View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
	flex: 1,
	padding: 8,
	backgroundColor: '#fff',
  },
  list: {
	paddingBottom: 16,
  },
  itemContainer: {
	flex: 1,
	margin: 8,
	alignItems: 'center',
	justifyContent: 'center',
  },
  image: {
	width: 150,
	height: 150,
	resizeMode: 'cover',
	borderRadius: 8,
  },
});
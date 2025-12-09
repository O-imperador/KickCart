
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import CartListItem from '../components/CartListItem';
const ShoppingCartTotals = ({ items }) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const delivery = 10;
    const total = subtotal + delivery;
    
    return (
        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>${delivery.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>${total.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const ShoppingCart = () => {
    const cartItems = useSelector(state => state.cart.items);
    
    return (
        <View style={{ flex: 1 }}>
            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Votre panier est vide</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <CartListItem cartItem={item} />}
                        keyExtractor={(item) => item.product.id}
                    />
                    <ShoppingCartTotals items={cartItems} />
                </>
            )}
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
        fontWeight: '500',
    },
    totalsContainer: {
        paddingTop: 10,
        borderColor: 'gainsboro',
        borderTopWidth: 1,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    text: {
        fontSize: 16,
        color: 'gray'
    },
    textBold: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});

export default ShoppingCart;
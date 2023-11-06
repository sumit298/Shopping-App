import { createContext, useState } from "react";
import React from "react";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);

    const addToCart = (item) => {
        // checking if the cart item is already in the cart.
        // We are using the find method to check if the item is already in the cart. The find method returns the value of the first element in the array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
        // If the item is already in the cart, we are using the map method to increase the quantity of the item in the cart. The map method creates a new array populated with the results of calling a provided function on every element in the calling array.
        // If the item is not in the cart, we are using the spread operator to add the item to the cart.
        const isinCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (isinCart) {
            setCartItems(
                cartItems.map((cartItem) => cartItem.id === item.id ?
                    { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            )
        }
        else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }

    const removeFromCart = (item) => {
        const isinCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (isinCart.quantity === 1) {
            // if the quantity of the item is 1, remove the item from the cart
            setCartItems(cartItems.filter((cartItem) =>
                cartItem.id !== item.id))
        }
        else {
            // if the quantity of item is greater than 1, decrease the quantity of the item
            setCartItems(
                cartItems.map((cartItem) => cartItem.id === item.id ?
                    { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
            )
        }
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }


    React.useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems]);

    React.useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems))
        }
    }, [])

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;
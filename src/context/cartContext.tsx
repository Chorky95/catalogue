import { createContext, useState, useEffect, ReactNode } from 'react'

// Define the shape of the cart item and context
interface CartItem {
    id: number,
    name: string,
    quantity: number,
    price: number,
    image: string
}

interface CartContextType {
    cart: CartItem[],
    addToCart: (item: CartItem) => void,
    removeFromCart: (id: number) => void,
    clearCart: () => void,
}

// Create the context
export const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState([] as CartItem[])

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Function to add an item to the cart
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
            }
            return [...prevCart, item]
        })
    }

    // Function to remove an item from the cart
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== id))
    }

    // Function to clear the cart
    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
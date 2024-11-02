import { CartContext } from '@/context/cartContext'
import { useState, useEffect, useContext, useRef } from 'react'
import Image from 'next/image'
import CartIcon from '../images/cartIcon'

export default function Cart() {
	const cartContext = useContext(CartContext)
	const [cartOpen, setCartOpen] = useState(false as boolean)
	const [cartSize, setCartSize] = useState(0 as number)
	const [cartSum, setCartSum] = useState(0 as number)

	if (!cartContext) {
		throw new Error("No CartContext!")
	}

	const { cart, addToCart, removeFromCart, clearCart } = cartContext

	const toggleCart = () => {
		const cartElement = document.querySelector('.cart')

		if(cartElement) {
			if(!cartElement.classList.contains('cart--active')) {
				cartElement.classList.add('cart--active')
				document.querySelector('body')?.classList.add('no-scroll')
				document.querySelector('body')?.classList.add('blurred')
			} else if(cartElement.classList.contains('cart--active')){
				cartElement.classList.remove('cart--active')
				document.querySelector('body')?.classList.remove('no-scroll')
				document.querySelector('body')?.classList.remove('blurred')
			}
		}
	}

	const updateCart = () => {
		if(cart && cart.length > 0) {
			let cartPrice = 0
			let cartItems = 0
			cart.forEach((item) => {
				cartPrice = cartPrice + (item.price * item.quantity)
				cartItems = cartItems + item.quantity
			})
			setCartSum(cartPrice)
			setCartSize(cartItems)
		}
	}

	useEffect(() => {
		updateCart()
	}, [cart])

	useEffect(() => {
		updateCart()
	}, [])


	return (
		<aside className="cart">
			<div className="cart__container">
				<div className="cart__button" onClick={toggleCart}>
					<div className="cart__button__icon">
						<CartIcon />
						{cart && cart.length > 0 && 
							<div className="cart__button__items">
								{cartSize}
							</div>
						}
					</div>
				</div>
				<div className="cart__pane">
					<div className="cart__pane__container">
						<div className="cart__pane__close" onClick={toggleCart}></div>
						{cart && cart.length > 0 ? 
							<>
								<div className="cart__items">
									{cart && cart.length > 0 && cart.map((item, index) => (
										<div className="cart__item" key={index}>
											<div className="cart__item__container">
												<div className="cart__item__info">
													<p className="cart__item__name">
														{item.name}
													</p>
													<p className="cart__item__price">
														{item.price}€
													</p>
													<p className="cart__item__quantity">
														Quantity: {item.quantity}
													</p>
												</div>
												<div className="cart__item__image">
													<Image 
														src={item.image}
														alt={item.name}
														fill={true}
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
														priority={true}
													/>
												</div>	
											</div>	
											<div className="cart__item__remove button" onClick={() => {removeFromCart(item.id)}}>
												Remove
											</div>
										</div>
									))}
								</div>
								<div className="cart__buy button" onClick={() => {
									clearCart()
									setCartSum(0)
								}}>Buy for {cartSum.toFixed(2)}€</div>
								<div className="cart__clear-cart button" onClick={() => {
									clearCart()
									setCartSum(0)
								}}>Clear Cart</div>	
							</>
						: 
							<div className='cart__empty'>
								<p className="cart__empty__text">
									The Cart is empty!
								</p>
							</div>
						}
					</div>
				</div>
			</div>
		</aside>
	)
}

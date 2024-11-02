import type { Product as ProductType} from '@/app/types/ProductType'
import limitString from '@/app/utilities/limitString'
import { CartContext } from '@/context/cartContext'
import Image from 'next/image'
import { useState, useContext } from 'react'

export default function Product({product} : {product: ProductType}) {
    const [showModal, setShowModal] = useState(false as boolean)
    const [cartNotification, setCartNotification] = useState({show : false, message: null} as {show: boolean, message: string|null})
    const cartContext = useContext(CartContext)

    if (!cartContext) {
      throw new Error("No CartContext!")
    }
  
    const { cart, addToCart, removeFromCart, clearCart } = cartContext

    const addItemToCart = (item : {id: number, name: string, quantity: number, price: number, image: string}) => {
        addToCart(item)
        showCartNotification('Added to cart!')
    }

    const removeItemFromCart = (itemId : number) => {
        removeFromCart(itemId)
        showCartNotification('Removed from cart!')
    }

    const showCartNotification = (message = '' as string) => {
        setCartNotification({show: true, message: message})
        setTimeout(() => {
            setCartNotification({show: false, message: null})
        }, 2000)
    }

    const showInfo = () => {
        setShowModal(true)
        document.querySelector('body')?.classList.add('no-scroll')
    }

    const hideInfo = () => {
        setShowModal(false)
        document.querySelector('body')?.classList.remove('no-scroll')
    }

    return (
        <div className="products__item">
            {product.thumbnail && 
                <div className="products__item__image">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                    ></Image>   
                </div>
            }
            {(product.title || product.price) && 
                <div className="products__item__info">
                    {product.title && 
                        <p className="products__item__name">
                            {product.title}
                        </p>
                    }
                    {product.price && 
                        <p className="products__item__price">
                            {product.price}€
                        </p>
                    }
                </div>
            }
            {product.description && 
                <p className="products__item__description">
                    {limitString(product.description)}
                </p>
            }
            <p className="products__item__button button" onClick={showInfo}>
                Info
            </p>
            {showModal && 
                <div className="products__modal blurred">
                    <div className="row">
                        <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
                            <div className="products__modal__container">
                                <div className="products__modal__close" onClick={hideInfo}></div>
                                <div className="products__modal__main-data">
                                    <div className="products__modal__info">
                                        <h3 className="products__modal__title">
                                            {product.title}
                                        </h3> 
                                        <p className="products__modal__price">
                                            {product.price}€
                                        </p>
                                        <p className="products__modal__description">
                                            {product.description}
                                        </p>
                                    </div>  
                                    <div className="products__modal__image">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            fill={true}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={true}
                                        ></Image>  
                                    </div> 
                                </div>
                                <div className="products__other">
                                    <div className="products__other__data">
                                        <p className="products__other__key">
                                            Brand:
                                        </p>
                                        <p className="products__other__value">
                                            {product.brand}
                                        </p>
                                    </div>
                                    <div className="products__other__data">
                                        <p className="products__other__key">
                                            Category:
                                        </p>
                                        <p className="products__other__value">
                                            {product.category}
                                        </p>
                                    </div>
                                    <div className="products__other__data">
                                        <p className="products__other__key">
                                            Availability Status:
                                        </p>
                                        <p className="products__other__value">
                                            {product.availabilityStatus}
                                        </p>
                                    </div>
                                    <div className="products__other__data">
                                        <p className="products__other__key">
                                            Rating:
                                        </p>
                                        <p className="products__other__value">
                                            {product.rating}
                                        </p>
                                    </div>
                                    <div className="products__other__data">
                                        <p className="products__other__key">
                                            Weight:
                                        </p>
                                        <p className="products__other__value">
                                            {product.weight}
                                        </p>
                                    </div>
                                    <button className='products__add-to-cart button' onClick={() => {addItemToCart({id: product.id, name: product.title, quantity: 1, price: product.price, image: product.thumbnail})}}>
                                        Add to cart
                                    </button>
                                    {cart.find(cartItem => cartItem.id === product.id) && 
                                        <button className='products__remove-from-cart button' onClick={() => {removeItemFromCart(product.id)}}>
                                            Remove from cart
                                        </button>
                                    }
                                    {cartNotification.show && cartNotification.message && 
                                        <p className="products__cart-notification">
                                            {cartNotification.message}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
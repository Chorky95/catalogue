import { CartContext } from '@/context/cartContext';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

export default function Cart() {
  return (
    <aside className="cart">
        <div className="cart__button"></div>
        <div className="cart__container">
            <div className="cart__items"></div>
            <div className="cart__buy"></div>
            <div className="cart__clear-cart"></div>
        </div>
    </aside>
  )
}

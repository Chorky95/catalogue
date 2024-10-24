import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Product as ProductType } from '@/app/types/ProductType';
import Product from './product';

export default function Products () {
    const [products, setProducts] = useState([] as ProductType[])

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await fetch('https://dummyjson.com/products?limit=9&skip=0');
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await res.json();
          setProducts(data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
  
      getProducts()
    }, [])

   
  
    // useEffect(() => {
    //   console.log(products);
    // }, [products]);

    return (
        <section className='products'>
            <div className="row">
                {products && products.length > 0 && products.map((product, index) => (
                    <div className="col-sm-4" key={index}>
                        <Product 
                           product={product}
                        />
                    </div>
                ))}  
            </div>
        </section>
    )
}
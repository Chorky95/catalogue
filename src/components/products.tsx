import { useEffect, useState } from 'react';
import type { Product as ProductType } from '@/app/types/ProductType';
import Product from './product';
import { ProductCategory } from '@/app/types/ProductCategoryType';

export default function Products () {
    const [products, setProducts] = useState([] as ProductType[])
    const [productCategories, setProductCategories] = useState([] as ProductCategory[])
    
    const getProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=20&skip=0');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    const getCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setProductCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    useEffect(() => {
      getCategories()
      getProducts()
    }, [])

   
  
    useEffect(() => {
      console.log(productCategories);
    }, [productCategories]);

    return (
        <section className='products'>
            <div className="row">
                {products && products.length > 0 && products.map((product, index) => (
                    <div className="col-xs-12 col-sm-6 col-md-3" key={index}>
                        <Product 
                           product={product}
                        />
                    </div>
                ))}  
            </div>
        </section>
    )
}
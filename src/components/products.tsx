import { useEffect, useState } from 'react';
import type { Product as ProductType } from '@/app/types/ProductType';
import Product from './product';
import { ProductCategory } from '@/app/types/ProductCategoryType';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import getMinMax from '@/app/utilities/getMinMax';

export default function Products () {
    const [products, setProducts] = useState([] as ProductType[])
    const [productCategories, setProductCategories] = useState([] as ProductCategory[])
    const [displayedProducts, setDisplayedProducts] = useState([] as ProductType[])
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState('')
    
    const getProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=0');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
        setDisplayedProducts(data.products)
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

    const changeCategory = (event: SelectChangeEvent) => {
      setCategory(event.target.value as string);
    };

    const changePriceRange = (event: SelectChangeEvent) => {
      setPriceRange(event.target.value as string)
    }

    const getNewProducts = () => {
      let newPriceRange = getMinMax(priceRange)
      let newProducts = products.filter((product) => {
        if((product.category == category || category == '') && (priceRange == '' || ((product.price <= newPriceRange.max) && (product.price >= newPriceRange.min)))) {
          return product
        }
      })

      setDisplayedProducts(newProducts)
    }

    useEffect(() => {
      getCategories()
      getProducts()
      setDisplayedProducts(products)
    }, [])
  
    useEffect(() => {
      getNewProducts()

    }, [category, priceRange]);

    return (
        <section className='products'>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-no-vertical-padd">
                <div className="products__filter">
                  <div className="products__filter__categories">
                    <FormControl fullWidth>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                        labelId="category"
                        id="product-category-select"
                        value={category}
                        label="Category"
                        onChange={changeCategory}
                        placeholder='Category'
                      >
                        <MenuItem value={''}>Any</MenuItem>
                        {productCategories && productCategories.length > 0 && productCategories.map((category, index) => (
                          <MenuItem value={category.slug} key={index}>{category.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="products__filter__price">
                    <FormControl fullWidth>
                      <InputLabel id="price">Price</InputLabel>
                      <Select
                        labelId="price"
                        id="product-price-select"
                        value={priceRange}
                        label="Price"
                        onChange={changePriceRange}
                        placeholder='Price'
                      >
                        <MenuItem value={''}>Any</MenuItem>
                        <MenuItem value={'10 - 50'}>10€ - 50€</MenuItem>
                        <MenuItem value={'50 - 100'}>50€ - 100€</MenuItem>
                        <MenuItem value={'100 - 200'}>100€ - 200€</MenuItem>
                        <MenuItem value={'200 - 500'}>200€ - 500€</MenuItem>
                        <MenuItem value={'500 - 99999999999999'}>500€+</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
                {displayedProducts && displayedProducts.length > 0 && displayedProducts.map((product, index) => (
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
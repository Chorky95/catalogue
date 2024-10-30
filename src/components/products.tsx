import { useEffect, useState } from 'react';
import type { Product as ProductType } from '@/app/types/ProductType';
import Product from './product';
import { ProductCategory } from '@/app/types/ProductCategoryType';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import getMinMax from '@/app/utilities/getMinMax';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Products () {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [products, setProducts] = useState([] as ProductType[])
    const [productCategories, setProductCategories] = useState([] as ProductCategory[])
    const [displayedProducts, setDisplayedProducts] = useState([] as ProductType[])
    const [pagedProducts, setPagedProducts] = useState([] as ProductType[])
    const [category, setCategory] = useState('' as string)
    const [priceRange, setPriceRange] = useState('' as string)
    const [sorting, setSorting] = useState('' as string)
    const [search, setSearch] = useState('' as string)
    const [numberOfPages, setNumberOfPages] = useState(1 as number)
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') ?? '1') as number)
    const [searching, setSearching] = useState(false as boolean)
    const pageSize : number = 20
    
    const getProducts = async () => {
      setSearching(true)
      try {
        const res = await fetch('https://dummyjson.com/products?limit=0')
        if (!res.ok) {
          setSearching(false)
          throw new Error('Failed to fetch products')
        }
        const data = await res.json()
        setProducts(data.products)
        setDisplayedProducts(data.products)
        setNumberOfPages(Math.floor(data.products.length / 20))
        setSearching(false)
      } catch (error) {
        setSearching(false)
        console.error('Error fetching products:', error)
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

    const changeSorting = (event: SelectChangeEvent) => {
      setSorting(event.target.value as string)
    }

    const applySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value as string)
    }

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page)
    }

    const getnewProducts = () => {
      setSearching(true)
      let newPriceRange = getMinMax(priceRange)
      let newProducts = products.filter((product) => {
        if((product.category == category || category == '') 
          && (priceRange == '' || ((product.price <= newPriceRange.max) && (product.price >= newPriceRange.min))) 
          && (search == '' || (product.title.toLowerCase().includes(search.toLowerCase())))) {
          return product
        }
      })

      if(sorting == 'price-lower') {
        newProducts.sort((a, b) => a.price - b.price)
      } else if(sorting == 'price-higher') {
        newProducts.sort((a, b) => b.price - a.price)
      } else if(sorting == 'a-z') {
        newProducts.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      } else if(sorting == 'z-a') {
        newProducts.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
      }

      setDisplayedProducts(newProducts)
      setNumberOfPages(Math.floor(newProducts.length / pageSize))
      setCurrentPage(1)
      let shownProducts = newProducts.slice(0, 20)
      setPagedProducts(shownProducts)
      setSearching(false)
    }

    const getAnotherPage = () => {
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      const newProducts = displayedProducts.slice(startIndex, endIndex)
      setPagedProducts(newProducts)
    } 

    useEffect(() => {
      getCategories()
      getProducts()
      setDisplayedProducts(products)

      setNumberOfPages(Math.floor(products.length / pageSize))
    }, [])
  
    useEffect(() => {
      getnewProducts()
    
    }, [category, priceRange, sorting, search, products]);
    

    useEffect(() => {
      getAnotherPage()
    }, [currentPage])

    return (
        <section className='products'>
                <div className="products__filter">
                  <div className="row">
                    <div className="col-xs-12 col-sm-3">
                      <div className="products__filter__search">
                        <TextField id="outlined-basic" label="Search" variant="outlined" value={search} onInput={applySearch} />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-3">
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
                    </div>
                    <div className="col-xs-12 col-sm-3">
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
                              <MenuItem value={'0 - 50'}>0€ - 50€</MenuItem>
                              <MenuItem value={'50 - 100'}>50€ - 100€</MenuItem>
                              <MenuItem value={'100 - 200'}>100€ - 200€</MenuItem>
                              <MenuItem value={'200 - 500'}>200€ - 500€</MenuItem>
                              <MenuItem value={'500 - 99999999999999'}>500€+</MenuItem>
                            </Select>
                          </FormControl>
                        </div> 
                    </div>
                    <div className="col-xs-12 col-sm-3">
                      <div className="products__filter__sort">
                        <FormControl fullWidth>
                          <InputLabel id="sort">Sort</InputLabel>
                          <Select
                            labelId="sort"
                            id="product-sort-select"
                            value={sorting}
                            label="Sort"
                            onChange={changeSorting}
                            placeholder='Sort'
                          >
                            <MenuItem value={''}>No sorting</MenuItem>
                            <MenuItem value={'price-lower'}>Price: Lower first</MenuItem>
                            <MenuItem value={'price-higher'}>Price: Higher first</MenuItem>
                            <MenuItem value={'a-z'}>Name: A to Z</MenuItem>
                            <MenuItem value={'z-a'}>Name: Z to A</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
              </div>
            <div className="row">
                {searching ? 
                  <div className="col-xs-12">
                    <div className="spinner">
                      <CircularProgress />
                    </div>   
                  </div>
                : 
                <>
                  {pagedProducts && pagedProducts.length > 0 ? pagedProducts.map((product, index) => (
                      <div className="col-xs-12 col-sm-6 col-md-3" key={index}>
                          <Product 
                            product={product}
                          />
                      </div>
                  )) :
                    <div className="col-xs-12">
                      <h4 className="products__no-matches">
                        No products match your criteria...
                      </h4>
                  </div>
                  } 
                  {numberOfPages > 0 && 
                    <div className="col-xs-12">
                      <Pagination count={numberOfPages} variant="outlined" shape="rounded" page={currentPage} onChange={changePage} />
                    </div>
                  }
                </>
                }
            </div>
        </section>
    )
}
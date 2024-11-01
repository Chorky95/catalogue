import Header from '@/components/header';
import Footer from '@/components/footer';
import Products from '@/components/products';

export default async function Home() {

  const getProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=0')
      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await res.json()
      return data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      return error
    }
  }

  const getCategories = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await res.json();
      return data
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <>
        <Header></Header>
            <main className="main">
              {products && 
                <Products items={products} categories={categories}></Products>
              }
            </main>
        <Footer></Footer>
    </>
  );
}
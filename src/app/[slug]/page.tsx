'use client'
import Header from '@/components/header';
import Footer from '@/components/footer';
import Products from '@/components/products';

export default function Home() {
  return (
    <>
        <Header></Header>
            <main className="main">
                <Products></Products>
            </main>
        <Footer></Footer>
    </>
  );
}
'use client'
import { useEffect, useState } from 'react';
import '../styles/styles.global.scss'

export default function Home() {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(isMounted)

  return (
    <>
      <header className="header">header</header>
      <main className="main">main</main>
      <footer className="footer">footer</footer>
    </>
  );
}

import { useState } from 'react';
import Product from './components/Product';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Cart from './components/Cart';
import Hero from './components/hero/Hero';
import ProductDetail from './pages/ProductDetail';

function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element:<Layout />,
      children : [
        { element : <Hero />, path : '/'},
        { element : <ProductDetail />, path : '/product/:id'},
        { element : <Cart />, path : '/cart'}
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App

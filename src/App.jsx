import { useState } from 'react';
import Product from './components/Product';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Cart from './components/Cart';
import Hero from './components/hero/Hero';
import Aboutus from './pages/aboutus/Aboutus';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/signinup/Login';
import Register from './pages/signinup/Register';

function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element:<Layout />,
      children : [
        { element : <Hero />, path : '/'},
        { element : <Hero />, path : '/home'},
        { element : <ProductDetail />, path : '/product/:id'},
        { element : <Cart />, path : '/cart'},
        { element : <Aboutus />, path : '/about us'},
      ]
    },
    {
      path :'/login',
      element : <Login />
    },
    {
      path :'/register',
      element : <Register />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App

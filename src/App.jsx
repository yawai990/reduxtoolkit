import { useState } from 'react';
import Product from './components/Product';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Cart from './components/Cart';
import Hero from './components/hero/Hero';
import Promotions from './pages/Promotions';
import Aboutus from './pages/aboutus/Aboutus';
import Ourservice from './pages/services/Ourservice';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/signinup/Login';
import Register from './pages/signinup/Register';
import Userinfo from './pages/userinfo/Userinfo';

function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element:<Layout />,
      children : [
        { element : <Hero />, path : '/'},
        { element : <Hero />, path : '/home'},
        { element : <Userinfo />, path : '/user/userinfo'},
        { element : <Promotions />, path : '/promotions'},
        { element : <ProductDetail />, path : '/product/:id'},
        { element : <Cart />, path : '/cart'},
        { element : <Ourservice />, path : '/our services'},
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

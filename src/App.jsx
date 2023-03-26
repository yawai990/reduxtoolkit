import { useState } from 'react';
import Product from './components/Product';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Cart from './components/Cart';


function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element:<Layout />,
      children : [
        { element : <Product />, path : '/'},
        { element : <Cart />, path : '/cart'}
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App

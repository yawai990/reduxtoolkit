import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getAllProducts } from './features/Product';
import { getBestSeller } from './features/BestSeller';
import { fetchCategory } from './features/Category';

const Layout = () => {
    const dispatch = useDispatch();

    useEffect(() =>{
      dispatch(getAllProducts('DEFAULT','DEFAULT'))
      dispatch(getBestSeller())
      dispatch(fetchCategory())
    },[]);

  return (
    <>
          <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
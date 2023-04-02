import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import Footer from './components/Footer';
import { getAllProducts } from './features/Product';
import Hero from './components/hero/Hero';

const Layout = () => {
    const cart = useSelector(state => state.Cartitems);
    const dispatch = useDispatch();

    useEffect(() =>{
      dispatch(getAllProducts())
    },[]);
  return (
    <>
            <nav>
        <h5 className='logo'>Shoppy</h5>
        <Link to={'/cart'}>
        <button className='cart'>
            <span>{cart.total}</span>
            <GiShoppingCart className='cart_icon' />
            </button>
        </Link>
        </nav>
        <Hero />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
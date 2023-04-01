import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';

const Layout = () => {
    const cart = useSelector(state => state.Cartitems);
  return (
    <>
            <nav>
        <h5>Redux Toolkit</h5>
        <Link to={'/cart'}>
        <button className='cart'>
            <span>{cart.total}</span>
            <GiShoppingCart className='cart_icon' />
            </button>
        </Link>
        </nav>
        <Outlet />
    </>
  )
}

export default Layout
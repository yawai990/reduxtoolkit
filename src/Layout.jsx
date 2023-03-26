import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = () => {
    const cart = useSelector(state => state.Cartitems);
  return (
    <>
            <nav>
        <h5>Redux Toolkit</h5>
        <Link to={'/cart'}>
        <button className='cart'>
            <span>{cart.total}</span>
            Cart</button>
        </Link>
        </nav>
        <Outlet />
    </>
  )
}

export default Layout
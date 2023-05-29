import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getAllProducts } from './features/Product';
import { getBestSeller } from './features/BestSeller';
import { fetchCategory } from './features/Category';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const ref = useRef();

    useEffect(() =>{
      dispatch(getAllProducts(1,'DEFAULT','DEFAULT','DEFAULT'))
      dispatch(getBestSeller())
      dispatch(fetchCategory())
    },[]);

  return (
    <>
      <ToastContainer />
          <Navbar />
          <SwitchTransition>
            <CSSTransition nodeRef={ref} timeout={250} classNames={'fade'} key={pathname}>
              <div ref={ref}>
               <Outlet />
              </div>
            </CSSTransition>
          </SwitchTransition>
        <Footer />
    </>
  )
}

export default Layout
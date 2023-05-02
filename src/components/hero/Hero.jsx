import React, { useEffect } from 'react';
import './hero.css';
import image from '../../assets/hero.png';
import { gsap } from 'gsap';
import Product from '../Product';
import NewArrival from '../newarrival/NewArrival';
import Bestseller from '../bestseller/Bestseller';

const Hero = () => {
          
     useEffect(() =>{
          const slogan = document.getElementsByClassName('slogan');
          const img = document.getElementsByClassName('img');
          gsap.fromTo(slogan, {scale : 1}, { scale : 1.4, ease : 'ease', duration : 1.2 })
          gsap.fromTo(img, {scale : 0}, { scale : 1, ease : 'ease', duration : 1.2 });

     }, []);
  return (
     <>
     <main className='hero_container'>
    <section className='hero_card_container'>

     <div className='slogan_container'>
          <h5 className="slogan" >Fashion</h5>

          <p>look your best on your best day</p>

          <button className='btn explore_btn'>explore now</button>
     </div>
     
     <div className='hero_image'>
          <img src={image} alt="" className='img' />
          <div className="bubbles"></div>
     </div>
    </section>
    </main>
    <Bestseller />
    {/* <NewArrival /> */}
    <Product />
    </>
  )
}

export default Hero
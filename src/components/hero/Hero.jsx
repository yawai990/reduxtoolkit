import React, { useState,useEffect } from 'react';
import './hero.css';
import image from '../../assets/hero2.jpg';
import image2 from '../../assets/hero3.jpg';
import { gsap } from 'gsap';
import Product from '../Product';
import NewArrival from '../newarrival/NewArrival';
import Bestseller from '../bestseller/Bestseller';

const heroArr = [
     { id : 1, url : image, text : 'New Collection', preText :"Women's Fashion"},
     { id : 2, url : image2, text : 'New Arrivals', preText : 'Girl Collections 2023'},
]

const Hero = () => {
     const [ index, setIndex ]  = useState(1);
     
     // const Prev = () =>{
     //      if(index === 0 ){
     //           setIndex(heroArr.length - 1)
     //      }else{
     //           setIndex(pre => pre -1)
     //      }
     // };
     const Next = () => {
          if(index === heroArr.length - 1){
               setIndex(0)
          }else{
               setIndex(prev => prev + 1)
          }
     };

     useEffect(() =>{
         const timer = setInterval(() =>{
          Next();
          }, 10000);
          return () => clearInterval(timer)
     }, [index]);    

     useEffect(() =>{
          const hero = document.getElementById('hero');
          hero.style.backgroundImage = `url(${heroArr[index].url})`;

          const slogan = document.getElementsByClassName('slogan');
          const btn = document.getElementById('view_collection');
          const preText = document.getElementById('preText');

          gsap.fromTo(preText, { opacity : 0, y: -100}, { opacity : 1,  y: 0,duration : 0.5, onComplete:() =>{
               gsap.fromTo(slogan, {opacity : 0, y : -100}, 
                    { color: 'var(--primary)', opacity:1,y:0, ease : 'ease', duration :0.5, onComplete : () =>{
                         gsap.fromTo(btn, {opacity : 0, y : 100}, { opacity : 1,y:0, ease : 'ease', duration : 0.3 });
                    }}
               )
          }})
     }, [index]);

  return (
     <>
     <div id='hero' className='hero_container'>
          <div className="text-wrapper">
               <p id='preText'>{heroArr[index].preText}</p>
               <h1 className='slogan'>{heroArr[index].text}</h1>

               <button id="view_collection" className="btn btn_view">View Collection</button>
          </div>

          <section className="dot_container flex justify-center align-center">
               {
                    Array.from({length : heroArr.length }).map((_,idx) =>(
                         <div onClick={() => setIndex(idx)} key={idx} className={`dot ${idx === index ? 'dot_active':null}`}></div>
                    ))
               }
          </section>
     </div>
    <Bestseller />
    {/* <NewArrival /> */}

    <div style={{ marginTop:'2rem'}}>
    <Product />
     </div>
    </>
  )
}

export default Hero
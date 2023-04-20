import React from 'react';
import './ourservice.css';
import reliability from '../../assets/reliability.png';
import productreturn from '../../assets/return.png';
import delivery from '../../assets/delivery.png';

const Ourservice = () => {
  return (
    <main style={{ minHeight :'60vh'}} className='width-90 m-top'>
    <div className='about_us_header'>
    <h5>Our Services</h5>
    </div>

    <section className='flex justify-center flex-wrap m-top'>
      <main style={{ gap : '0.8rem'}} className='flex flex-wrap justify-center'>
        <ServiceCard img={reliability} title={'Reliability'} desc={'At our office, we provide a professional explanation of product details by our experienced sales staff.'} />
        <ServiceCard img={productreturn} title={'Product Return'} desc={'At our office, we provide a professional explanation of product details by our experienced sales staff.'} />
        <ServiceCard img={delivery} title={'Our Delivery'} desc={'At our office, we provide a professional explanation of product details by our experienced sales staff.'} />
     
      </main>
    </section>

    </main>
  )
};

const ServiceCard = ({ img, title, desc}) =>{
  return  <div className='service_card'>
  <div className='servicec_card_image'>
   <img src={img} alt="" />
  </div>
  <div className='content_container'>
    <h5>{title}</h5>
    <p>{desc}</p>
  </div>
</div>
}

export default Ourservice
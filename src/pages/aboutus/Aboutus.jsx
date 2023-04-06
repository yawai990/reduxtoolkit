import React from 'react';
import './aboutus.css';

const Aboutus = () => {
  return (
   <main className='about_us'>
     <div className='about_us_header'>
     <h5>Company Profile</h5>
     </div>

     <section className="content">
          <Content image={'https://pro1globalhomecenter.com/resources/images/company_profile/pro1.png'} content={'PRO 1 Global Home Center is the biggest building materials and home living product shopping center in Myanmar and it has 10-years experience of home building and living store center 10 years, which offers construction material, home decorative products, tools and equipment used in construction, home improvement, and household and gardening decoration in modern trade warehouse style. Currently, PRO 1 Global Home Center has opened 12 branches which are in major cities of Yangon, Mandalay , and Shan States and trying to open more branches to cover all Myanmar regions and to become the leader of one stop service home living product center.'} />

          <Content reverse={'row_reverse'} image={'https://pro1globalhomecenter.com/resources/images/company_profile/our-vision.png'} content={'To be the leader of the construction material and home improvement retail industry in Myanmar.'} />
     </section>
   </main>
  )
};

const Content = ({ reverse, image,content }) =>{
     return (
          <main className={`flex align_center gap ${reverse && reverse}`}>
          <div>
               <img src={image} alt="" style={{ objectFit:'cover'}} />
          </div>
          <div>
               <p>
               {content}
               </p>
          </div>
         </main>
     )
}

export default Aboutus
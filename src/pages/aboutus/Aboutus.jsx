import React from 'react';
import './aboutus.css';
import eco from '../../assets/eco.png';

const Aboutus = () => {
  return (
   <main className='about_us'>
     <div className='about_us_header'>
     <h5>Company Profile</h5>
     </div>

     <section className="content">
          <Content image={eco} content={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa delectus sint ullam dolor praesentium nostrum quae placeat libero et! Veritatis saepe velit odio voluptatum vitae, hic voluptate neque pariatur voluptates ab quaerat est sequi minus aut architecto excepturi assumenda eos officia cum. Rerum a similique velit dolorum, deserunt quia ab!'} />
          <Content mt reverse={'row_reverse'} image={'https://pro1globalhomecenter.com/resources/images/company_profile/our-vision.png'} content={'To be the leader of the construction material and home improvement retail industry in Myanmar.'} />
     </section>
   </main>
  )
};

const Content = ({ reverse, image,content, mt }) =>{
     return (
          <main className={`flex align_center gap ${reverse && reverse} ${mt ? 'm-top':null}`}>
          <div className='about_us_img_container'>
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
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF,FaTwitter,FaGooglePlusG,FaLinkedinIn,FaCcVisa,FaCcPaypal,FaCcMastercard } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='Footer'>
     <div className="footer_component_container">
      <div>
        <h5>Contact information</h5>

        <main>
          <p>contact us at whatapps at : </p>

          <div>
          {
          ['+959-988988988(whatapps)','+959-988988989(mobile)'].map((t,idx)=><Link to={''} key={`${t}-${idx}`} >{t}</Link>)
         }
          </div>
        </main>
      </div>
      <div>
        <h5>Customer Support</h5>

        <main>
         {
          ['frequent questions','shipping & return','contact us'].map((t,idx)=><Link to={`/${t}`} key={`${t}-${idx}`} >{t}</Link>)
         }
        </main>
      </div>
      <div>
         <h5>legal warning</h5>

        <main>
          {
             ['terms of use questions','scondition of contract','cookies policy'].map((t,idx)=><a href="#" key={`${t}-${idx}`} >{t}</a>)
          }
        </main>
        </div>

      <section>

        <div>
      <h5>follow us on</h5>

      <main className='social_icon_container'>
       <Social Icon={<FaFacebookF />} bgColor={'#3b5998'} />
       <Social Icon={<FaTwitter />} bgColor={'#00acee'} />
       <Social Icon={<FaGooglePlusG />} bgColor={'#AB0205'} />     
       <Social Icon={<FaLinkedinIn />} bgColor={'#0072b1'} />
      </main>
      </div>

      <div style={{
        marginTop:'1rem'
      }}>
      <h5>payment methods</h5>

      <main className='social_icon_container'>
       <Payment Icon={<FaCcVisa />} />
       <Payment Icon={<FaCcPaypal />} />
       <Payment Icon={<FaCcMastercard />} /> 
      </main>
      </div>

      </section>

     </div>
    </div>
  )
};

const Social = ({Icon,bgColor}) => <a href="#" style={{
  background : bgColor
}} className='icon social_icon'>{Icon}</a>

const Payment = ({Icon,bgColor}) => <a href="#" style={{
  color : bgColor,
}} className='icon payment_icon'>{Icon}</a>

export default Footer
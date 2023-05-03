import React, { useState, useEffect } from 'react';
import './userinfo.css';
import * as api from '../../services';  
import { useLocation } from 'react-router-dom';

const Userinfo = () => {
     const [ userInfo, setUserInfo ] = useState({});

     useEffect(() =>{
          if(sessionStorage.getItem('token')){
               const userInfo = JSON.parse(localStorage.getItem('userInfo'));
               setUserInfo(userInfo)
          }
     },[]);

     const handleSubmit = async(e) =>{
          e.preventDefault();
          
          const elements = e.currentTarget.elements;
         const name = elements.name.value;
         const email = elements.email.value;
         const phNumber = elements.phone.value;
         const address = elements.address.value;
         const city = elements.city.value;
         const country = elements.country.value;
         const zipCode = elements.zip.value;

     //     setUserInfo({name,email,phNumber,address,city,country,zipCode});
        await api.updateUserInfo(userInfo._id,{name,email,phNumber,address,city,country,zipCode})
        .then(resp =>{
         const { success , userupdateData, message } = resp.data;
         if(success){
          localStorage.setItem('userInfo', JSON.stringify(userupdateData));
          history.back()
         }
        })
        .catch(err => console.log(err));
     }

    return (
     <main style={{ minHeight :'60vh'}} className='width-90 m-top'>
    <div className='about_us_header'>
    <h5>Your Information</h5>
    </div>

    <form onSubmit={handleSubmit}>

     <div style={{width : '60%'}} className="flex gap-sm">
          <div style={{width : '50%'}}>
          <FormControl name={'name'} label={'Your Name'} value={userInfo.name} />
          <FormControl name={'email'} label={'Your Email'} value={userInfo.email} />
          <FormControl name={'phone'} label={'Phone Number'} value={userInfo.phNumber} />
          </div>

          <div style={{width : '50%'}}>
          <FormControl name={'address'} label={'address'} value={userInfo.address} />
          <FormControl name={'city'} label={'city'} value={userInfo.city} />
          <FormControl name={'country'} label={'country'} value={userInfo.country} />
          <FormControl name={'zip'} label={'zip code'} value={userInfo.zipCode} type={'number'} />
          </div>
     </div>
     
          

     <button className='btn btn_usr_info'>Update</button>
    </form>
     </main>
  )
};

const FormControl = ({ type,name, label,value, fun}) =>{
     return <div className='usr_form_control'>
     <label htmlFor={name} className='usr_info_label'>{label}</label>
     <input 
     type={type || 'text'} 
     name={name} id={name} 
     onChange={fun}
     defaultValue={value || ''} 
     className='usr_info_form_input' />
</div>
}

export default Userinfo
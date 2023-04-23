import React from 'react';
import './userinfo.css';

const Userinfo = () => {
  return (
     <main style={{ minHeight :'60vh'}} className='width-90 m-top'>
    <div className='about_us_header'>
    <h5>Your Information</h5>
    </div>

    <form>
          <FormControl name={'name'} label={'Your Name'} value={'admin'} />
          <FormControl name={'email'} label={'Your Email'} value={'admin@admin.com'} />

     <button className='btn btn_usr_info'>Update</button>
    </form>
     </main>
  )
};

const FormControl = ({ type,name, label,value}) =>{
     return <div className='usr_form_control'>
     <label htmlFor={name} className='usr_info_label'>{label}</label>
     <input type={type || 'text'} name={name} id={name} value={value || ''} className='usr_info_form_input' />
</div>
}

export default Userinfo
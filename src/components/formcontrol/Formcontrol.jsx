import React from 'react';
import './formcontrol.css';

const Formcontrol = ({ icon, mt,type,passwordIcon, name, placeholder, passwordFun }) => {
  return (
     <div style={{
          marginTop : `${mt || 0}px`
     }} className='form_control flex align_center'>
                <div className='form_icon'>
                  {icon}
                </div>
                <input type={type || 'text'} className='form_input'name={name} placeholder={placeholder || ''} />
                {
                    name ==='password' &&  <button type='button' style={{
                         position:'absolute',
                         right:'10px',
                         zIndex:10
                    }}
                    onClick={passwordFun}
                    className='form_icon password_eye'>
                    {passwordIcon}
                  </button>
                }
     </div>
  )
}

export default Formcontrol
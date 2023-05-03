import React, { useState} from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../assets/pngwing.com (3).png';
import { AiOutlineMail } from 'react-icons/ai';
import Formcontrol from '../../components/formcontrol/Formcontrol';
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { BsFillKeyFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import * as api from '../../services';

const Register = () => {
  const [ err, setErr ] = useState({ msg : '',status : false});
  const [ showPassword, setShowPasswrd ] = useState(false);
  const [ showCpassword, setShowCpassword]  =useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPasswrd(!showPassword);
  const handleCShowPassword = () => setShowCpassword(!showCpassword);

  const handleRegister = async (e) =>{
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const name = elements.name.value;
    const email = elements.email.value;
    const password = elements.password.value;
    const confirmPassword =elements.c_password.value;

    if(name === '' || email === '' || password === '' || confirmPassword === ''){
      elements.name.value = name;
      elements.email.value = email;
      elements.password.value = password;
      elements.c_password.value = confirmPassword;
      setErr({ status : true, msg : 'please fill requried fields'})
    }else{
      if(password.length < 8){
        setErr({ status : true, msg : 'password should have at least 8 characters'})
        elements.password.value = '';
        elements.c_password.value = '';
      }else{
      if(password !== confirmPassword){
        setErr({ status : true, msg : 'passwords did not match'});
        elements.c_password.value = '';
      }else{
        await api.Register({ name, email, password})
        .then(resp => console.log(resp))
        .catch(err => setErr({ tatusbar : true, msg : err.message}))
        setErr({ status : false, msg : ''})
        elements.name.value = '';
        elements.email.value = '';
        elements.password.value = '';
        elements.c_password.value = '';
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }
    }
    }
  }
  return (
    <main className='w-full h-full flex justify-center align_center'>
    <section className="login_form_container flex">

        <div className='w_h_half flex justify-center align_center'>
          <img src={image} alt="" className='login_image' />  
      </div>

        <div className='w_h_half login_form_container_right'>
          <h4 className="header_text">Welcome to <span>Shoppy</span></h4>
          <h5>Shop Smarter, Not Harder</h5>

          <form action="" className='login_form' onSubmit={handleRegister}>
            { err.status && <p className='err_msg'>** {err.msg}</p>}

            {
              [
                { name : 'name', icon : <FaUserCircle />, placeholder : 'username'},
                { name : 'email', icon : <AiOutlineMail />,placeholder : 'email'},
              ].map((i,idx)=>(
                <Formcontrol 
                key={`${i.name}-${idx}`}
                icon={i.icon} 
                name={i.name} 
                placeholder={i.placeholder}
                mt={16} />
              ))
            }

            {
              [
                { name : 'password', icon1 : <BsFillKeyFill />, placeholder : 'password' , type : showPassword, fun : handleShowPassword},
                { name : 'c_password', icon1 : <BsFillKeyFill />, placeholder : 'confirm password' , type : showCpassword, fun : handleCShowPassword},
              ].map((i,idx) =>(
                <Formcontrol 
                  key={`${i.name}-${idx}`}
                  icon={i.icon1} 
                  mt={16} name={i.name} 
                  placeholder={i.placeholder} 
                  type={i.type ? 'text':'password'} 
                  passwordFun={i.fun}
                  passwordIcon={i.type ? <AiFillEyeInvisible />:<AiFillEye />}
                  />
              ))
            }
            <button className='btn sign_in_btn text-white'>Sign Up</button>
          
          </form>

          <div className='m-top'>
            <p>
              <small className='flex'>
                have account?
              <Link to={'/login'} style={{
                color:'blue',
                marginLeft:'4px'
              }} href="" className='capitalize'>sign in</Link>
              </small>
            </p>
          </div>
        </div>
    </section>
  </main>
  )
}

export default Register
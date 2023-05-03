import React, { useState} from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import image from '../../assets/pngwing.com (3).png';
import { AiOutlineMail } from 'react-icons/ai';
import Formcontrol from '../../components/formcontrol/Formcontrol';
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { BsFillKeyFill } from 'react-icons/bs';
import { logIn } from '../../features/User';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [ showPassword, setShowPasswrd ] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const handleShowPassword = () => setShowPasswrd(!showPassword);

  const handleLogin = e => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    
    const email = elements.email.value;
    const password = elements.password.value;

    //call the api
    dispatch(logIn({ email, password}));
    const token = sessionStorage.getItem('token');
    if(token){
      location.href = '/'
    }
  };

  return (
    <main className='w-full h-full flex justify-center align_center'>
      <section className="login_form_container flex">
          <div className='w_h_half flex justify-center align_center'>
            <img src={image} alt="" className='login_image' />
          </div>

          <div className='w_h_half login_form_container_right'>
            <h4 className="header_text">Welcome to <span>Shoppy</span></h4>
            <h5>Shop Smarter, Not Harder</h5>

            <form action="" className='login_form' onSubmit={handleLogin}>
              
              <Formcontrol icon={<AiOutlineMail />} name={'email'} placeholder={'email or username'} />
              <Formcontrol icon={<BsFillKeyFill />} 
              mt={20} name={'password'} 
              placeholder={'password'} 
              type={showPassword ? 'text':'password'} 
              passwordFun={handleShowPassword}
              passwordIcon={showPassword ? <AiFillEyeInvisible />:<AiFillEye />}
              />

              <button className='btn sign_in_btn text-white'>Sign In</button>
            
            </form>

            <div className='m-top'>
              <main> <div>Register</div>
                <small className='flex'>
                  don't have account?
                <Link to={'/register'} style={{
                  color:'blue',
                  marginLeft:'4px'
                }} href="" className='capitalize'>sign up</Link>
                </small>
              </main>
            </div>
          </div>
      </section>
    </main>
  )
}

export default Login
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../services';
import './review.css';
import { getAllProducts } from '../../features/Product';
import { Link, useNavigate } from 'react-router-dom';

const Review = ({ pID }) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [ showErr, setShowErr ] = useState(false);
 
     const handleWriteReview = async(e) => {
          e.preventDefault();
          const elements = e.currentTarget.elements;
         const rating = elements.rating.value;
         const desc = elements.message.value;

         if(sessionStorage.getItem('token')){
              if(rating && desc ) {
                await api.WriteReview(pID,{rating,comment : desc})
                .then(resp =>{
                    console.log(resp)
                    dispatch(getAllProducts(1,'DEFAULT','DEFAULT','DEFAULT'))
                     setShowErr(false)
                     navigate('/')
                })
                .catch(err => console.log(err))
              }
         }else{
          setShowErr(true)
          navigate('/login')
         }
     }
  return (
    <form onSubmit={handleWriteReview}>

     <h5 style={{
          marginBottom : '1.4rem'
     }}>Write Review</h5>
     <div className='form-control'>
          <label htmlFor="rating">Rating</label>
          <select name='rating' id='rating' defaultValue={1}>
               {
                    [1,2,3,4,5].map(n => (
                         <option key={n} value={n}>{n}</option>
                    ))
               }
          </select>
     </div>

     <div className='form-control'>
          <label htmlFor="message">Description</label>
         <textarea name='review_message'id='message' placeholder='Write your review....' />
     </div>

     <button className='btn review_btn'>Submit</button>
     {
         showErr &&
     <p style={{ fontSize : '12px'}}>you need to log in to write review
     <Link style={{ display:'inline-block', color:'#009FBD', marginLeft:'0.5rem', marginTop:'0.3rem'}} to={'/login'}>
     go to login
     </Link>
     </p>
     }
    </form>
  )
}

export default Review;
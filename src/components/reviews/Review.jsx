import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../services';
import './review.css';

const Review = ({ pID }) => {
     const dispatch = useDispatch();
     // const state = useSelector(state => state);
 
     const handleWriteReview = async(e) => {
          e.preventDefault();
          const elements = e.currentTarget.elements;
         const rating = elements.rating.value;
         const desc = elements.message.value;
        if(rating && desc ) {
          await api.WriteReview(pID,{rating,comment : desc})
          .then(resp =>{
               console.log(resp)
          })
          .catch(err => console.log(err))
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
    </form>
  )
}

export default Review
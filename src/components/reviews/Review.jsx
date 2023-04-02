import React from 'react';
import './review.css';

const Review = () => {
  return (
    <form>

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
          <label htmlFor="rating">Description</label>
         <textarea placeholder='Write your review....' />
     </div>

     <button className='btn review_btn'>Submit</button>
    </form>
  )
}

export default Review
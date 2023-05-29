import React from 'react';
import './loading.css';

const Loading = ({ text }) => {
  return (
    <main className='skeleton_card'>

      <div className="skeleton_image skeleton" />

        <div className="skeleton-text skeleton" />

          <span className="skeleton_price skeleton" />

          <span className="skeleton_btn skeleton" />

  </main>
  )
}

export default Loading
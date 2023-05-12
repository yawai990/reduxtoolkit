import React from 'react';
import './heading.css';

const Heading = ({title}) => {
  return (
     <div className='header_text_line'>
          <div className="line" />
               <h1 className='heading_text'>{title}</h1>
     </div>
  )
}

export default Heading
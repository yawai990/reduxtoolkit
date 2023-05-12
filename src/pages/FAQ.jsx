import React,{ useState } from 'react';
import Heading from '../components/heading/Heading';
import { IoIosArrowUp,IoIosArrowDown } from 'react-icons/io';
import './faq.css';
import questions from './faq.json';

const FAQ = () => {

  return (
    <section>
     <Heading title={'Frequent Ask Questions'} />

     <main style={{ width :'60%', marginTop : '4rem'}} className='m-auto'>

     { questions?.map(q => (<QuestionCollapse key={q.id} question={q.question} answer={q.answer} />))}
     </main>
    </section>
  )
};

const QuestionCollapse = ({ question, answer }) =>{
     const [ toggle, setToggle ] = useState(false);
     return <div className='faq_container m-top'>
     <div className="question_container flex justify-between align_center">
          <p>{question}</p>
          <button onClick={() => setToggle(!toggle)} className='drop_down_btn flex justify-center align_center'>
               { toggle ?<IoIosArrowUp />:<IoIosArrowDown /> }
               </button>
     </div>
     <div className={`answer ${toggle === true ? 'show_answer':null}`}>
         {answer}
     </div>
</div>
}

export default FAQ
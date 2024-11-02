import React, { useState, useEffect, useRef } from 'react'
import './Quizz.css'
import { data } from '../../assets/data'


const Quizz = () => {
  let [count, setCount] = useState(0);
  let [question, setQuestion] = useState(data[count].question);
  let [option1, setOption1] = useState(data[count].option1);
  let [option2, setOption2] = useState(data[count].option2);
  let [option3, setOption3] = useState(data[count].option3);
  let [option4, setOption4] = useState(data[count].option4);
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState(0);
  let  [dayStatus, setdayStatus] = useState(true);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let Option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    console.log(data[count].ans);
    if (lock === false) {
      if (data[count].ans === ans) {
        e.target.classList.add("correct");
        setScore(++score);
        setLock(true);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        Option_array[data[count].ans - 1].current.classList.add("correct");

      }
    } else {

    }
  }

  console.log(data);
  useEffect(() => {
    if (data[count] != null) {
      setQuestion(data[count].question);
      setOption1(data[count].option1);
      setOption2(data[count].option2);
      setOption3(data[count].option3);
      setOption4(data[count].option4);
    } else {

    }

  }, [count]);

  function setnewQuestion() {
    if (lock === true) {
      if (count === data.length - 1) {
        setResult(true);
        return 0;
      }
      setCount((prev) => prev + 1);
      setLock(false);
      Option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }

  }
  function Reset() {
    setCount(0);
    setScore(0);
    setLock(false);
    setResult(false);

  }

  return (
    <div className={`Container ${dayStatus?'day':'night'}`} >
      <div className="header">
        <h1>Quizz app</h1>
        <button onClick={()=>setdayStatus((prev)=>!prev)} 
        className={dayStatus?'night':'day'}></button>
      </div>
      
      <hr />
      {result ?
        <>
          <h1>You have successfully completed your test</h1>
          <h2>  You scored {score} out of {data.length}</h2>
          <button onClick={Reset} className={dayStatus?'night':'day'}>Reset</button>
        </> :
        <>
          <h2>{count + 1}. {question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{option1}</li>
            <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{option2} </li>
            <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{option3}</li>
            <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{option4}</li>
          </ul>
          <button onClick={setnewQuestion} className={dayStatus?'night':'day'}>Next</button>
          <div className="index">{count + 1} of {data.length}</div>
        </>
      }

    </div>
  )
}

export default Quizz
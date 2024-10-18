
import React, { useEffect, useRef, useState } from 'react'
import { data } from '../assets/data';

function Quiz() {
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(data[index])
    const [score, setScore] = useState(0)
    const [lock, setLock] = useState(false)
    const [result, setResult] = useState(false)
    const [timer, setTimer] = useState(5);

    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let option_Array = [option1, option2, option3, option4]
    const checkAns = (e, answer) => {
        if (lock === false) {
            if (question.answer === answer) {
                e.target.classList.add("bg-green-500", "text-white", "border-green-700");
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("bg-red-500", "text-white", "border-red-700");
                setLock(true)
                option_Array[question.answer - 1].current.classList.add("bg-green-500", "text-white", "border-green-700");
            }
            setTimeout(nextQuestion, 1000); 
        }
    }
    const nextQuestion = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true)
                return (0)
            }
            setIndex(index => index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_Array.map((option) => {
                option.current.classList.remove("bg-red-500", "text-white", "border-red-700")
                option.current.classList.remove("bg-green-500", "text-white", "border-green-700")
                return null
            })
            setTimer(5);
            
        }
    };

    


   const reset=()=>{
           setIndex(0)
           setQuestion(data[0])
           setScore(0)
           setResult(false)
           setLock(false)
   }


   // Handle Timer Logic
   useEffect(() => {
    if (timer > 0 && !lock) { // Only update the timer if it's greater than 0 and answer is not locked
        const countdown = setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearTimeout(countdown); // Clear timeout on component unmount or question change
    } else if (timer === 0 && !lock) {
        // If time runs out, show the correct answer
        option_Array[question.answer - 1].current.classList.add("bg-green-500", "text-white", "border-green-700");
        setLock(true);
        setTimeout(nextQuestion, 1000); // Move to the next question after 1 second
    }
}, [timer, lock, question]);

    return (

        <div className=' container'>
            <div className='parent  lg:w-[600px] sm:[400px] w-[270px]  m-auto mt-16 rounded-xl lg:mt-20 bg-white text-black py-4 px-4 flex flex-col gap-10 '>
                <div className='quiz text-xl font-medium'>
                    <h2>Quiz-app </h2>
                    <hr className="border-t-2 border-pink-400" />
                    {result?<></>:<><div className='timer text-center text-2xl font-bold'>
                    Time Left: {timer} seconds
                </div></>}
                </div>
                {result?<></>:<>
                    <div className='ques flex flex-col gap-4'>
                    <p className=' md:text-lg font-medium '>{index + 1}.{question.question}</p>
                    <ul className=' flex flex-col gap-3 p-2' >
                        <li ref={option1} onClick={(e) => { checkAns(e, 1) }} className=' border text-xl px-2 py-1 cursor-pointer '>{question.option1}</li>
                        <li ref={option2} onClick={(e) => { checkAns(e, 2) }} className=' border text-xl px-2 py-1 cursor-pointer'>{question.option2}</li>
                        <li ref={option3} onClick={(e) => { checkAns(e, 3) }} className=' border text-xl px-2 py-1 cursor-pointer'>{question.option3}</li>
                        <li ref={option4} onClick={(e) => { checkAns(e, 4) }} className=' border text-xl px-2 py-1 cursor-pointer'>{question.option4}</li>
                    </ul>
                </div>

               
                    <button className=" text-center capitalize  transition-transform lg:w-24  bg-yellow-400 w-16 rounded-lg lg:ml-48 ml-20 sm:ml-36 hover:bg-yellow-300 duration-300 hover:text-white " onClick={nextQuestion}>Next
                    </button>
              
                <p className=' text-center'>{index + 1} of  {data.length}</p>
                </>}
                {result?<><h2>you answer correct {score} out of the {data.length}</h2>
                <button className=" text-center capitalize  transition-transform lg:w-24  bg-yellow-400 w-16 rounded-lg lg:ml-48 ml-20 sm:ml-36 hover:bg-yellow-300 duration-300 hover:text-white " onClick={reset}>Reset
                </button></>:<></>}
                
            </div>

        </div>
    )
}

export default Quiz
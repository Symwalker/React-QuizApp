// import React, { useEffect, useState } from 'react'

// const App = () => {
//     const [questions, setQuestions] = useState([])
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const [answers, setAnswers] = useState([])
//     console.log(answers);
//     const getQuestionFromApi = () => {
//         fetch('https://the-trivia-api.com/v2/questions')
//             .then((res) => {
//                 return res.json()
//             })
//             .then((res) => {
//                 setQuestions(res)
               
//             })

//     }
//     const nextQuestion = () => {
//         setCurrentIndex(currentIndex + 1)
//     }
//     const reStart = () => {
//         setCurrentIndex(0)
//     }

//     useEffect(() => {
//         getQuestionFromApi()
        
//     }, [])
//     if (!questions.length) {
//         return <div>
//             loading
//         </div>
//     }
//     return (
//         <div>
//             <div>
//                 <h2>{questions[currentIndex].question.text}</h2>
//             </div>
//             {/* answers */}
//             <div>
//                 <ul>
//                     {
//                         answers.map((item, i) => (
//                             <li key={i}>{item}</li>
//                         ))
//                     }
//                 </ul>
//             </div>
//             {
//                 currentIndex === questions.length - 1 ? (
//                     <button className='bg-black text-white p-2 rounded-md' onClick={reStart}>Re-Start</button>
//                 ) : (
//                     <button className='bg-black text-white p-2 rounded-md' onClick={nextQuestion}>nextQueston</button>
//                 )
//             }
//         </div>
//     )
// }

// export default App

import React, { useEffect, useState } from 'react';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    console.log(answers);

    const getQuestionFromApi = () => {
        fetch('https://the-trivia-api.com/v2/questions')
            .then((res) => res.json())
            .then((res) => {
                const inCorrectAnswers = res[currentIndex].incorrectAnswers;
                const ans = [...inCorrectAnswers, res[currentIndex].correctAnswer];
                setAnswers(ans);
                setQuestions(res);
            });
    };

    const nextQuestion = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const reStart = () => {
        setCurrentIndex(0);
    };

    useEffect(() => {
        getQuestionFromApi();
    }, []);

    if (!questions.length) {
        return <div>loading</div>;
    }

    return (
        <div>
            <div>
                <h2>{questions[currentIndex].question.text}</h2>
            </div>
            {/* answers */}
            <div>
                <ul>
                    {answers.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            {currentIndex === questions.length - 1 ? (
                <button className='bg-black text-white p-2 rounded-md' onClick={reStart}>
                    Re-Start
                </button>
            ) : (
                <button className='bg-black text-white p-2 rounded-md' onClick={nextQuestion}>
                    nextQueston
                </button>
            )}
        </div>
    );
};

export default App;

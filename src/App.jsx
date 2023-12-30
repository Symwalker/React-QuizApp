


import React, { useEffect, useState } from 'react';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ShowResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [slectedAnswer, setSelectedAnswer] = useState(null)
    console.log(questions[currentIndex]?.options);
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getQuestionFromApi = () => {
        fetch('https://the-trivia-api.com/v2/questions')
            .then((res) => res.json())
            .then((res) => {
                res.map((item) => {
                    item.options = [...item.incorrectAnswers, item.correctAnswer]
                    item.options = shuffleArray(item.options);
                })
                setQuestions(res);
            });
    };

    const nextQuestion = () => {
        const corrAnswer = questions[currentIndex].correctAnswer
        if (slectedAnswer === corrAnswer) {
            setScore(score + 1)
        }
        setCurrentIndex(currentIndex + 1);
    };

    const reStart = () => {
        setShowResult(false)

        setCurrentIndex(0);
    };
    const result = () => {
        setShowResult(true)
    };

    const handleSelectedAnswer = (i) => {
        // const answe = questions[i]
        console.log(i);
        setSelectedAnswer(i)
    };


    useEffect(() => {
        getQuestionFromApi();
    }, []); // Include currentIndex as a dependency to trigger the effect when it changes

    if (!questions.length) {
        return <div>loading</div>;
    }

    return (
        <div className='bg-gray-200 h-screen p-10'>
            <div className='mx-auto rounded-lg z-50 bg-white max-w-[550px]  hadow-sm '>
                {
                    ShowResult ? (
                        <div className='p-2'>
                            <h2 className='text-[22px] '>Your score is <q className='font-semibold'>{score}</q></h2>
                            <button className='bg-blue-700 text-white font-semibold text-[18px] p-2 rounded-md mt-3' onClick={reStart}>
                                Restart
                            </button>
                        </div>
                    ) : (
                        <div className='flex justify-between flex-col gap-10'>
                            <div>
                                <h2 className='text-[22px] font-bold p-1'>Q{currentIndex + 1}) {questions[currentIndex].question.text}</h2>
                            </div>
                            <ul>
                                {
                                    questions[currentIndex]?.options.map((item, i) => (
                                        <li className='flex items-center gap-4 p-1' key={i}>
                                            <input className='w-[20px] h-[20px]' type="checkbox" onChange={() => handleSelectedAnswer(item)} checked={slectedAnswer === item} />
                                            <label className='text-[20px]' >{item}</label>
                                        </li>
                                    ))
                                }

                            </ul>
                            <div className=''>
                                {currentIndex === questions.length - 1 ? (
                                    <button className='w-full bg-black text-white p-2 rounded-md' onClick={result}>
                                        Show Result
                                    </button>
                                ) : (
                                    <button className='w-full bg-blue-800 text-white font-semibold text-[18px] p-2 rounded-md' onClick={nextQuestion}>
                                        Next Question
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default App;

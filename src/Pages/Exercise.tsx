import { useEffect, useState } from "react";
import * as QuestionComponent from "../component/QuestionComponent"
import { useParams } from "react-router-dom";
import axios from "axios";

interface MultipleChoiceQuestion {
    type: 1 | 2;
    question: string;
    options: [string, string, string, string];
}

interface TextQuestion {
    type: 3;
    question: string;
}

type Question = MultipleChoiceQuestion | TextQuestion;

export default function Test() {
    const param = useParams();

    const [questionsList, setQuestionsList] = useState<Question[]>([]);

    

    useEffect(() => {
        async function getQuestion() {
            const path = window.location.pathname;
            const parts = path.split("/");
            await axios.post(`http://localhost:8192/problems/${param.id}`, {
                type : parts[1].toLowerCase(),
            })
            .then(res => {
                let newQuestion : any[] = [];
                for (let i = 0; i < res.data.length; i++) {
                    const Question = {
                        type : res.data[i].Type,
                        question : res.data[i].Question,
                        options : res.data[i].Options
                    };

                    newQuestion.push(Question);
                }
                
                setQuestionsList(newQuestion);
            })
            .catch(error => console.log(error));
        }

        getQuestion();
        
    }, [param.id]);

    const [answer, setAnswer] = useState<string[]>(Array(questionsList.length).fill(""));

    const handleAnswerChange = (id : number, value : string) => {
        const newAnswer : string[] = answer;
        newAnswer[id] = value;
        setAnswer(newAnswer);
    }

    function handleSubmit(e : any) {
        e.preventDefault();

        console.log(answer);
    }

    return (
        // <div className="flex flex-col items-center mt-[10px] overflow-hidden">
        //     <form onSubmit={handleSubmit}>
        //         {questionsList.map((question, index) => {
        //             switch (question.type) {
        //                 case 1:
        //                     return (
        //                         <QuestionComponent.MultipleChoice 
        //                             question={question.question} 
        //                             options={question.options} 
        //                             ID={index}
        //                             onChange={handleAnswerChange}
        //                         />
        //                     );
                        
        //                 case 2:
        //                     return (
        //                         <QuestionComponent.TrueFalseChoice 
        //                             question={question.question} 
        //                             options={question.options} 
        //                             ID={index}
        //                             onChange={handleAnswerChange}
        //                         />
        //                     );

        //                 case 3:
        //                     return (
        //                         <QuestionComponent.ShortAnswer 
        //                             question={question.question}
        //                             ID={index}
        //                             onChange={handleAnswerChange}
        //                         />
        //                     )
        //             }
        //         })}

        //         <button 
        //             type="submit"
        //             className="w-full h-[50px] border-[1px] my-[50px] cursor-pointer bg-[#14518b] text-[white] rounded-[20px] hover:bg-[white] hover:text-[#14518b]
        //             duration-300"
        //         >Submit</button>
        //     </form>
        // </div>

        <div className="w-full h-full flex p-[20px]">
            <div className="w-[80%] h-full">
                {questionsList.map((question, index) => {
                    switch (question.type) {
                        case 1:
                            return (
                                <QuestionComponent.MultipleChoice 
                                    question={question.question} 
                                    options={question.options} 
                                    ID={index}
                                    onChange={handleAnswerChange}
                                />
                            );
                        
                        case 2:
                            return (
                                <QuestionComponent.TrueFalseChoice 
                                    question={question.question} 
                                    options={question.options} 
                                    ID={index}
                                    onChange={handleAnswerChange}
                                />
                            );

                        case 3:
                            return (
                                <QuestionComponent.ShortAnswer 
                                    question={question.question}
                                    ID={index}
                                    onChange={handleAnswerChange}
                                />
                            )
                        }
                    })
                }

                    
                
            </div>
                
            <div className="w-[15%] rounded-[20px] flex flex-col items-center fixed right-[3%] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] z-50">
            <button 
                    onClick={(e) => handleSubmit(e)}
                    className="w-[80%] h-[50px] border-[1px] my-[50px] cursor-pointer bg-[#14518b] text-[white] rounded-[20px] hover:bg-[white] hover:text-[#14518b]
                    duration-300"
                >Submit</button>
            </div>
        </div>
    )
}
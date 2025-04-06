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
    const [nameProblem, setNameProblem] = useState<string>("");
    useEffect(() => {
        async function getQuestion() {
            const path = window.location.pathname;
            const parts = path.split("/");
            await axios.post(`http://localhost:8192/problems/${param.id}`, {
                type : parts[1].toLowerCase(),
            })
            .then(res => {
                let newQuestion : any[] = [];
                for (let i = 0; i < res.data[0].length; i++) {
                    const Question = {
                        type : res.data[0][i].Type,
                        question : res.data[0][i].Question,
                        options : res.data[0][i].Options
                    };
                    newQuestion.push(Question);
                }

                setNameProblem(res.data[1])
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
        <div className="w-full h-full flex flex-col p-[20px] px-[5%]">
            <div className="mb-[30px] border-b-[1px] border-b-[#ccc]">
                <h1 className="text-[40px]">{nameProblem}</h1>
            </div>

            <div className="flex flex-1 w-full">
                <div className=" w-[80%] h-full">
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

                            case 4: 
                                return (
                                    <QuestionComponent.Coding
                                    question = {question.question}
                                        ID={index}
                                    />
                                )
                            }
                        })
                    }
                </div>
                    
                <div className="w-[15%] rounded-[20px] flex flex-col items-center fixed right-[5%] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] z-50">
                <button 
                        onClick={(e) => handleSubmit(e)}
                        className="w-[80%] h-[50px] border-[1px] my-[50px] cursor-pointer bg-[#14518b] text-[white] rounded-[20px] hover:bg-[white] hover:text-[#14518b]
                        duration-300"
                    >Submit</button>        
                </div>
            </div>
            
        </div>
    )
}
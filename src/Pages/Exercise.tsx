import { useEffect, useState } from "react";
import * as QuestionComponent from "../component/QuestionComponent"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import questionInterface from "../api/QuestionApi";

export default function Test() {
    const param = useParams();

    const [questionsList, setQuestionsList] = useState<questionInterface[]>([]);    
    const [nameProblem, setNameProblem] = useState<string>("");
    const path = window.location.pathname;
    const parts = path.split("/");
    const [answer, setAnswer] = useState<string[]>([]);
    useEffect(() => {
        async function getQuestion() {
            // Call API Question
            await axios.post(`http://localhost:8192/problems/${param.id}`, {
                type : parts[1].toLowerCase(),
            })
            .then(res => {
                let newQuestion : questionInterface[] = [];
                for (let index = 0; index < res.data[0].length; index++) {
                    const QuestionType = res.data[0][index].Type;
                    if (QuestionType == 4) {
                        const QuestionTestCase : string[][] = res.data[0][index].testcase;
                        const QuestionCoding : {
                            topic : string,
                            input : string,
                            output : string,
                            example : string[][]
                        } = res.data[0][index].Question;
                        

                        newQuestion.push({
                            id : index,
                            type : 4,
                            topic : QuestionCoding.topic,
                            input : QuestionCoding.input,
                            output : QuestionCoding.output,
                            example : QuestionCoding.example,
                            answer : QuestionTestCase
                        });
                    }
                    else {
                        const QuestionAnswer = res.data[0][index].answer;
                        const Question : questionInterface = {
                            id : index,
                            type : QuestionType,
                            question : res.data[0][index].Question,
                            options : [],
                            answer : ""
                        };

                        switch (QuestionType) {
                            case 1:
                                Question["answer"] = QuestionAnswer[0].toString();
                                Question["options"] = res.data[0][index].Options;
                                break;
                            
                            case 2:
                                let resultTrueFalse = "";
                                for (let j = 0; j < QuestionAnswer.length; j++) {
                                    if (res.data[0][index].answer[j]) resultTrueFalse += "True"
                                    else resultTrueFalse += "False"
                                    if (j != 3) resultTrueFalse += "-"
                                }
                                Question["answer"] = resultTrueFalse;
                                Question["options"] = res.data[0][index].Options;
                                break;
                            
                            case 3:
                                Question["answer"] = QuestionAnswer;
                                break;
                        }

                        newQuestion.push(Question);
                    }
                }
                setNameProblem(res.data[1])
                setQuestionsList(newQuestion);
                setAnswer(Array(newQuestion.length).fill(""));
            })
            .catch(error => console.log(error));
        }

        getQuestion();
        
    }, [param.id]);

    const handleAnswerChange = (id : number, value : string) => {
        const newAnswer : string[] = answer;
        newAnswer[id] = value;
        setAnswer(newAnswer);
    }

    const navigate = useNavigate();
    function handleSubmit(e : any) {
        e.preventDefault();
        console.log(answer, questionsList);
        navigate(`/${parts[1]}/${param.id}/Submit`, {
            state : {
                answer, nameProblem, path, questionsList
            }
        })
    }

    return (
        <div className="w-full h-full flex flex-col p-[20px] px-[5%]">
            <div className="mb-[30px] border-b-[1px] border-b-[#ccc]">
                <h1 className="text-[40px]">{nameProblem}</h1>
            </div>

            <div className="flex flex-1 w-full">
                <div className=" w-[80%] h-full">
                    {questionsList.map((question) => {
                        switch (question.type) {
                            case 1:
                                return (
                                    <QuestionComponent.MultipleChoice 
                                        question={question} 
                                        onChange={handleAnswerChange}
                                    />
                                );
                            
                            case 2:
                                return (
                                    <QuestionComponent.TrueFalseChoice 
                                        question={question} 
                                        onChange={handleAnswerChange}
                                    />
                                );

                            case 3:
                                return (
                                    <QuestionComponent.ShortAnswer 
                                        question={question}
                                        onChange={handleAnswerChange}
                                    />
                                )

                            case 4: 
                                return (
                                    <QuestionComponent.Coding
                                        question={question}
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
                        duration-300">Submit
                    </button>        
                </div>
            </div>
            
        </div>
    )
}
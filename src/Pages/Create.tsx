import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../component/Radio.css"
// import { IoIosClose } from "react-icons/io";
import questionInterface from "../api/QuestionApi";
import axios from "axios";
import * as questionCreate from "../component/questionCreate";
import { textareaHeight } from "../utils/inputUtils";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function CreateHub() {
    return (
        <div className="flex justify-center">
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.5)] w-[400px] h-[400px] rounded-[5px] flex flex-col items-center justify-center rounded-[10px]">
                {/* <div className="w-[100px] h-[100px] bg-[#14518b] font-bold text-white">
                </div> */}
                
                    <Link to={"/Create/Problem"}
                    className="block flex items-center justify-center w-[200px] h-[100px] bg-[#14518b] font-bold text-white rounded-[10px] text-[20px] border-[#14518b] hover:bg-white hover:border-[1px] hover:text-[#14518b] duration-[0.2s]">
                        Problem
                    </Link>
                    {/* <br /> */}
                    <Link to={"/Create/Contest"}
                    className="block flex items-center justify-center w-[200px] h-[100px] bg-[#14518b] font-bold text-white rounded-[10px] text-[20px] border-[#14518b] hover:bg-white hover:border-[1px] hover:text-[#14518b] duration-[0.2s] mt-[30px]">
                        Contest
                    </Link>
                {/* <Link to={"/"} */}
                {/* className="bg-[#14518b] text-white font-bold px-[100px] py-[50px]" >Contest</Link> */}
            </div>
        </div> 
    )
}

function BoxQuestion(props : {
    questionList : questionInterface[],
    onChange : (value : questionInterface[]) => void
    onFocus : (value : string) => void
}) {
    const questionList = props.questionList;

    function setQuestionList(value: questionInterface, index: number): questionInterface[] {
        const updatedList = [...questionList];
        updatedList[index] = value;
        return updatedList;
    }

    type HandleChangeOption = {
        questionChange?: boolean;
        typeChange?: boolean;
        answerChange ?: boolean;
      };

    function handleChange(e : any, question : questionInterface,option : HandleChangeOption = {
        questionChange : false,
        typeChange : false,
        answerChange : false,
    }) {
            // Change Question or Topic
            if (option.questionChange && question.type != 4) question.question = e.target.value;
            else if (option.questionChange && question.type == 4) question.topic = e.target.value;
            // Change Question Type
            if (option.typeChange) {
                let Question;
                if (question.type == 4) {
                    Question = question.topic;
                    question.topic = "";
                } else {
                    Question = question.question;
                    question.question = "";
                }
                question.type = e.target.value;
                if (question.type == 4) {
                    question.topic = Question;
                    question.input = "";
                    question.output = "";
                    question.example = [];
                    question.answer = [];
                }
                else {
                    question.answer = "";
                    question.question = Question;
                    if (question.type != 3) question.options = [];
                }
            }
            if (option.answerChange) {
                if (question.type == 3) {
                    question.answer = e.target.value;
                }
            }
            return question;
    }

    return (
        <>
            {
            questionList.map((question, index) => (
                    <div className="w-full mb-[20px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="p-[20px] border-b-[1px] border-b-[#ccc] relative">
                            <textarea placeholder="Nhập câu hỏi"
                                className="w-full outline-none text-[30px] border-b-[1px] border-b-[#ccc] mb-[20px] overflow-hidden"
                                onInput={(e) => textareaHeight(e)}
                                onChange={(e) => props.onChange(setQuestionList(handleChange(e, question, {questionChange : true}), index))}
                            />

                            <questionCreate.RenderAnswerInput question={question} updateAnswer={(value) => props.onChange(
                                setQuestionList(value, index)
                            )}/>

                            <questionCreate.ToolCreate question={question} onClick={
                                (value) => props.onChange(setQuestionList(value, index))}
                            />
                        </div>
                        <questionCreate.QuestionTypeSelector onChange={(e) => props.onChange(
                            setQuestionList(handleChange(e, question, {typeChange : true}), index)
                        )}/>
                    </div>
                ))
            }
        </>
    );
}

function CreateProblem() {
    const negative = useNavigate();
    const [focusValue, setFocusValue] = useState<string>();
    const [questionList, setQuestionList] = useState<questionInterface>(
        {
            id : 1,
            type : 1,
            question : "",
            options : [],
            answer : ""
        }
    );

    function handleSubmit() {
        console.log(questionList);
        async function AddQuestion() {
            await axios.post("http://localhost:8192/problems/create", {
                questionList : [questionList],
                nameQuestion : nameProblem,
                type : "Problem"
            }).then(
                res => {
                    if (res.data.add) negative("/");
                }
            )
        }
    
        AddQuestion();
    }

    const [nameProblem, setNameProblem] = useState("");

    return (
        <div className="w-full h-full relative px-[5%] flex">
            <div className="w-[80%] h-full">
                <input type="text" className="border-[1px] border-[#ddd] w-full h-[20px] p-[30px] text-[20px] mb-[30px] outline-none rounded-[20px]"
                placeholder="Tên Problem" onChange={(e) => setNameProblem(e.target.value)}/>
                <BoxQuestion 
                questionList={[questionList]}
                onChange={(newList) => setQuestionList(newList[0])}
                onFocus={(value) => setFocusValue(value)}
                />
            </div>

            <div className="w-[20%] h-full fixed right-[2%]">
                <button className="w-full h-[50px] border-[1px] mb-[20px] cursor-pointer text-[25px]
                bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
                hover:text-[#14518b] duration-[0.1s]">Xem Trước</button>
                <button className="w-full h-[50px] border-[1px] cursor-pointer text-[25px]
                bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
                hover:text-[#14518b] duration-[0.1s]" onClick={handleSubmit}>Xuất</button>
                <button className="border-[1px] mt-[20px] w-full text-[20px] rounded-[5px] text-[#14518b] hover:bg-[#14518b] hover:text-white cursor-pointer h-[50px]" onClick={() => {
                    const active = document.activeElement;
                    console.log(active);
                }}>Run Code</button>
                
                <div className="w-full min-h-[100px] mt-[20px] border-[2px] break-words p-[20px]">
                    {focusValue}
                </div>
            </div>

            
        </div>  
    )    
}

function CreateContest() {
    const negative = useNavigate();
    const [questionList, setQuestionList] = useState<questionInterface[]>([]);
    const [numberQuestion, setNumberQuestion] = useState<number>(1);
    const [nameContest, setNameContest] = useState("");
    function Add() {
        const newQuestion : questionInterface = {
            id : numberQuestion,
            type : 1,
            question : "",
            options : [],
            answer : ""
        }
        setQuestionList(t => [...t, newQuestion]);
        setNumberQuestion(t => t + 1);
    }

    function handleSubmit() {
        async function AddQuestion() {
            await axios.post("http://localhost:8192/problems/create", {
                questionList : questionList,
                nameQuestion : nameContest,
                type : "Contest"
            }).then(
                res => {
                    if (res.data.add) negative("/");
                }
            )
        }
    
        AddQuestion();
    }

    function remove(index : number) {
        setQuestionList(prevQuestionList => {
            const newList = prevQuestionList.filter((_, i) => i !== index);
            return newList;
        });
    }

    return (
        <div className="w-full h-full relative px-[5%] flex">
            <button className="w-[100px] h-[100px] text-[50px] 
            fixed right-[5%] bottom-[5%] shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[50%]
            cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-[0.2s]"
            onClick={Add}
            >+</button>

            

            <div className="w-[80%] h-full">
                <input type="text" className="border-[1px] border-[#ddd] w-full h-[20px] p-[30px] text-[20px] mb-[30px] outline-none rounded-[20px]"
                placeholder="Tên Contest" 
                onChange={(e) => setNameContest(e.target.value)}
                />

                
                <BoxQuestion questionList={questionList} onChange={(newList) => setQuestionList(newList)}/>
            </div>

            <div className="w-[20%] fixed right-[2%]">
                <button className="w-full h-[50px] border-[1px] mb-[20px] cursor-pointer text-[25px]
                bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
                hover:text-[#14518b] duration-[0.1s]">Xem Trước</button>
                <button className="w-full h-[50px] border-[1px] cursor-pointer text-[25px]
                bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
                hover:text-[#14518b] duration-[0.1s]" 
                onClick={handleSubmit}
                >Xuất</button>

                <div className="">

                </div>
            </div>
        </div>  
    )
}

export default {
    CreateHub,
    CreateContest,
    CreateProblem
}
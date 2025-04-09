import { useState } from "react"
import { Link } from "react-router-dom"
import Question from "../api/QuestionApi";
import "../component/Radio.css"
import { IoIosClose } from "react-icons/io";
import { TbMath } from "react-icons/tb";

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

type Props = {
    index1 : number,
    index2 : number,
    id : number,
    setAnswer : React.Dispatch<React.SetStateAction<string[]>>;
}

function MultipleChoiceCreateUI({index1, index2, id, setAnswer} : Props) {
    return (
        <>
            <div key={index2} className={`
            border-[1px] border-[#ccc] flex justify-center items-center cursor-pointer p-[20px]`}>
                <input 
                    type="radio"
                    className="w-full h-full"
                    name={id.toString()}
                    id={`${id}-${index2}`}
                    onChange={() => setAnswer(t => {
                        t[index1] = index2.toString();
                        return t;
                    })}
                />
            </div>

            <div className="border-[1px] border-[#ccc] p-[20px]">
                <textarea className="w-full outline-none text-[25px]"
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}></textarea>
            </div>
        </>
    )
}

function TrueFalseQuestionUI({index, id , setAnswer} : Props) {
    return (
        <>
            <div key={index} className="p-[20px] border-[1px] border-[#ccc]">
                <textarea className="w-full outline-none text-[25px]"
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}></textarea>
            </div>

            <div className="flex items-center border-[1px] border-[#ccc] p-[20px] flex-wrap">
                <div>
                    <input type="radio" 
                    id={`${id}-${index}-True`}
                    name={`${id}-${index}`}
                    className="w-[25px] h-[25px]" />
                    <label htmlFor={`${id}-${index}-True`} className="ml-[5px] text-[25px]">Đúng</label>
                </div>
                
                <div>
                    <input type="radio" 
                    id={`${id}-${index}-False`}
                    name={`${id}-${index}`}
                    className="ml-[20px] w-[25px] h-[25px]"/>
                    <label htmlFor={`${id}-${index}-False`} className="ml-[5px] text-[25px]">Sai</label>
                </div>
            </div>
        </>
    )
}

function createCodingQuestionUI() {
    return (
        <>
            
        </>
    )
}


function CreateProblem() {
    // const [questionList, setQuestionList] = useState<Question[]>([{
    //     type : 1,
    //     question : "",
    //     options : ["","","",""]
    // }]);

    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [idQuestionList, setIdQuestionList] = useState<number[]>([]);
    const [numOfQuestion, setNumOfQuestion] = useState<number>(0);
    const [result, setResult] = useState<string[]>([]);

    function Add() {
        const newQuestion : Question = {
            type : 1,
            question : "",
            options : ["","","",""]
        }
        setQuestionList(t => [...t, newQuestion]);
        setIdQuestionList(t => [...t, numOfQuestion]);
        setNumOfQuestion(t => t + 1);
        setResult(t => [...t, ""]);
    }

    function remove(index : number) {
        setQuestionList(prevQuestionList => {
            const newList = prevQuestionList.filter((_, i) => i !== index);
            return newList;
        });

        setResult(prevResult => {
            const newResultList = prevResult.filter((_, i) => i !== index);
            return newResultList;
        })

        setIdQuestionList(prevIdQuestionList => {
            const newIdList = prevIdQuestionList.filter((_, i) => i !== index);
            return newIdList;
        });
    }

    type HandleChangeOption = {
        questionChange?: boolean;
        typeChange?: boolean;
      };

    function handleChange(e : any, index : number, option : HandleChangeOption = {
        questionChange : false,
        typeChange : false
    }) {
        const newList : Question[] = [...questionList];
        if (option.questionChange) newList[index].question = e.target.value;
        if (option.typeChange) newList[index].type = e.target.value;
        setQuestionList(newList);
    }

    function handleSubmit() {
        console.log(result);
    }

    const [gender, setGender] = useState<string>("");

    return (
        <div className="w-full h-full relative px-[5%] flex">
            <button className="w-[100px] h-[100px] text-[50px] 
            fixed right-[5%] bottom-[5%] shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[50%]
            cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-[0.2s]" onClick={Add}>+</button>
            <div className="w-[80%] h-full">
                {
                    questionList.map((question, index) => (
                        <div className="w-full mb-[20px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                            <div className="p-[20px] flex items-center w-full h-[50px] bg-[#14518b] relative">
                                <p className="text-[25px] text-white font-bold">{index + 1} { }</p>
                                <button onClick={() => remove(index)} className="text-[50px] text-white font-bold cursor-pointer absolute right-0">
                                    <IoIosClose />
                                </button>
                            </div>

                            <div className="p-[20px] border-b-[1px] border-b-[#ccc] relative">
                                <textarea placeholder="Nhập câu hỏi"
                                className="w-full outline-none text-[30px] border-b-[1px] border-b-[#ccc] mb-[20px]"
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                                value={question.question}
                                onChange={(e) => handleChange(e, index, {questionChange : true})}
                                />

                                {/* <MultipleChoiceCreateUI index1={index} index2={i} id={index} setAnswer={setResult}/> */}

                                

                                {question.type == 1 || question.type == 2 ? (
                                    <>
                                        <div 
                                        className={`w-full grid ${question.type == 1 ? 
                                            'grid-cols-[20%_80%]' : 
                                            'grid-cols-[80%_20%]'} text-[20px] mb-[40px]`}
                                        >
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <>

                                                    <MultipleChoiceCreateUI index1={index} index2={i} id={idQuestionList[index]} setAnswer={setResult}/>
                                                    {/* <TrueFalseQuestionUI index={i} id={index} setAnswer={setResult}/>
                                                    question.type == 1 ?
                                                    MultipleChoiceCreateUI(i, idQuestionList[index], {setResult()}) : 
                                                    TrueFalseQuestionUI(i, idQuestionList[index])} */}
                                                </>
                                            ))}
                                        </div>
                                    </>
                                ) : ""}

                                {/* {question.type == 3 ? (
                                    <>
                                        <input type="text" 
                                        placeholder="Ghi đáp" 
                                        className="w-full h-[50px] text-[25px] outline-none border-[1px] border-[#ccc] p-[20px] mb-[40px] rounded-[5px]"/>
                                    </>
                                ) : ""}

                                {question.type == 4 ? createCodingQuestionUI() : ""} */}

                                <button 
                                className="absolute right-[20px] bottom-[20px] text-[30px] cursor-pointer mt-[20px]">
                                    <TbMath />
                                </button>
                            </div>
                                
                            <div className="flex items-center w-full h-[50px] bg-[#14518b] relative p-[20px]">
                                <select className="bg-white absolute right-[20px]" onChange={(e) => handleChange(e, index, {typeChange : true})}>
                                    <option value="1">Trắc Nghiệm</option>
                                    <option value="2">Đúng Sai</option>
                                    <option value="3">Trả lời ngắn</option>
                                    <option value="4">Coding</option>
                                </select>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="w-[20%] fixed right-[2%]">
                <button className="w-full h-[50px] border-[1px] mb-[20px] cursor-pointer text-[25px]
                bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
                hover:text-[#14518b] duration-[0.1s]">Xem Trước</button>
                <button className="w-full h-[50px] border-[1px] cursor-pointer text-[25px]
                bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
                hover:text-[#14518b] duration-[0.1s]" onClick={handleSubmit}>Xuất</button>
            </div>
        </div>  
    )
}

function CreateContest() {
    return (
        <div>
            
        </div>
    )
}

export default {
    CreateHub,
    CreateContest,
    CreateProblem
}
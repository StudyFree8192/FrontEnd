import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../component/Radio.css"
import { IoIosClose } from "react-icons/io";
import { TbMath } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import questionInterface from "../api/QuestionApi";
import axios from "axios";

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

function textareaHeight(e : any) {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
}

type Props = {
    Question : questionInterface
    setAnswer : React.Dispatch<React.SetStateAction<questionInterface>>;
}

function MultipleChoiceCreateUI({Question, setAnswer} : Props) {
    if (Question.type == 3 || Question.type == 4) return "";

    function handleChangeAnswer(index : number, text : string = "") {
        if (Question.type == 3 || Question.type == 4) return "";
        const Update : questionInterface = {...Question};

        if (Question.type == 1) {
            Update.answer = (index + 1).toString();
        } else {
            let TrueFalseQuestionAnswerList = Update.answer.split("-");
            TrueFalseQuestionAnswerList[index] = text;
            Update.answer = TrueFalseQuestionAnswerList.join("-");
        }

        return Update;
    }

    function handleChangeOption(e : any, index : number) {
        if (Question.type == 3 || Question.type == 4) return "";
        const Update : questionInterface = {...Question};
        Update.options[index] = e.target.value;

        return Update;
    }
    return (
        <div>
            {
                Question.options.map((_, index) => {
                    if (Question.type == 1) {
                        return (
                            <div className="flex items-center mb-[20px]">
                                <input type="radio" className="w-[50px] h-[50px]"
                                name={`${Question.id}`}
                                onChange={(e) => setAnswer(handleChangeAnswer(index))}/>
                                <textarea 
                                className="border-[1px] border-[#ddd] rounded-[10px] w-[90%] outline-none ml-[20px] text-[20px] p-[20px] overflow-hidden"
                                onInput={(e) => textareaHeight(e)}
                                onChange={(e) => setAnswer(handleChangeOption(e, index))}
                                ></textarea>
                            </div>
                        )
                    } else {
                        return (
                            <div className="flex items-center mb-[20px]">
                                <textarea 
                                className="border-[1px] border-[#ddd] rounded-[10px] w-[90%] outline-none ml-[20px] text-[20px] p-[20px] overflow-hidden"
                                onInput={(e) => textareaHeight(e)}
                                onChange={(e) => setAnswer(handleChangeOption(e, index))}
                                ></textarea>
                                <input type="radio" 
                                name={`${Question.id}-${index}`}
                                id={`${Question.id}-${index}-True`} 
                                onChange={(e) => setAnswer(handleChangeAnswer(index, "True"))}
                                className="w-[50px] h-[50px] ml-[20px] cursor-pointer"/>
                                <label htmlFor={`${Question.id}-${index}-True`} className="text-[20px] ml-[5px] cursor-pointer">Đúng</label>
                                <input type="radio" name={`${Question.id}-${index}`} 
                                id={`${Question.id}-${index}-False`}
                                onChange={(e) => setAnswer(handleChangeAnswer(index, "False"))}
                                className="w-[50px] h-[50px] ml-[20px] cursor-pointer"/>
                                <label htmlFor={`${Question.id}-${index}-False`} className="text-[20px] ml-[5px] cursor-pointer">Sai</label>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

function createCodingQuestionUI() {
    return (
        <>
            
        </>
    )
}

function CreateProblem() {
    const negative = useNavigate();
    const [questionList, setQuestionList] = useState<questionInterface>(
        {
            id : 1,
            type : 1,
            question : "",
            options : [],
            answer : ""
        }
    );

    const [nameProblem, setNameProblem] = useState("");

    type HandleChangeOption = {
        questionChange?: boolean;
        typeChange?: boolean;
        answerChange ?: boolean;
      };

    function handleChange(e : any, option : HandleChangeOption = {
        questionChange : false,
        typeChange : false,
        answerChange : false,
    }) {
        setQuestionList(prev => {
            const prevQuestionList = { ...prev };
            // Change Question or Topic
            if (option.questionChange && prevQuestionList.type != 4) prevQuestionList.question = e.target.value;
            else if (option.questionChange && prevQuestionList.type == 4) prevQuestionList.topic = e.target.value;
            
            // Change Question Type
            if (option.typeChange) {
                let Question;
                if (prevQuestionList.type == 4) {
                    Question = prevQuestionList.topic;
                    prevQuestionList.topic = "";
                } else {
                    Question = prevQuestionList.question;
                    prevQuestionList.question = "";
                }

                prevQuestionList.type = e.target.value;
                if (prevQuestionList.type == 4) {
                    prevQuestionList.topic = Question;
                    prevQuestionList.input = "";
                    prevQuestionList.output = "";
                    prevQuestionList.example = [];
                    prevQuestionList.answer = [];
                }

                else {
                    prevQuestionList.answer = "";
                    prevQuestionList.question = Question;
                    if (prevQuestionList.type != 3) prevQuestionList.options = [];
                }

            }
            return prevQuestionList;
        });
    }

    function AddOptions() {
        setQuestionList(prev => {
            const prevQuestionList = { ...prev };
            if (prevQuestionList.type !== 3 && prevQuestionList.type !== 4) {
                const newOptions = [...prevQuestionList.options];
                newOptions.push("");

                if (prevQuestionList.type == 2) {
                    let newAnswerTrueFalse : string = prevQuestionList.answer;

                    if (prevQuestionList.options.length != 0) newAnswerTrueFalse += "-";
                    return { ...prevQuestionList, options: newOptions, answer: newAnswerTrueFalse };
                }
                return { ...prevQuestionList, options: newOptions };
            }
            return prevQuestionList;
        })
    }

    function updateAnswer(updateQuestion : questionInterface) {
        setQuestionList(() => updateQuestion);
    }

    function handleSubmit() {
        async function AddQuestion() {
            console.log(questionList);
            await axios.post("http://localhost:8192/problems/create", {
                questionList : [questionList],
                nameQuestion : nameProblem
            }).then(
                res => {
                    if (res.data.add) negative("/");
                }
            )
        }

        AddQuestion();
    }

    return (
        <div className="w-full h-full relative px-[5%] flex">
            <div className="w-[80%] h-full">
                <input type="text" className="border-[1px] border-[#ddd] w-full h-[20px] p-[30px] text-[20px] mb-[30px] outline-none rounded-[20px]"
                placeholder="Tên Problem" onChange={(e) => setNameProblem(e.target.value)}/>
                <div className="w-full mb-[20px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <div className="p-[20px] border-b-[1px] border-b-[#ccc] relative">
                        <textarea placeholder="Nhập câu hỏi"
                            className="w-full outline-none text-[30px] border-b-[1px] border-b-[#ccc] mb-[20px] overflow-hidden"
                            onInput={(e) => textareaHeight(e)}
                            onChange={(e) => handleChange(e, {questionChange : true})}
                        />

                        {
                            questionList.type == 1 || questionList.type == 2 ?
                            (
                                <>
                                    <MultipleChoiceCreateUI 
                                    Question={questionList}
                                    setAnswer={(updateQuestion) => updateAnswer(updateQuestion)}
                                    />
                                </>
                            ) : (
                                <>
                                
                                </>
                            )
                        }

                        <div>
                            {questionList.type != 4 && questionList.type != 3 ? (
                                <button className="text-[30px] cursor-pointer" onClick={AddOptions}>
                                    <IoMdAdd />
                                </button>
                            ) : ""}
                            
                            <button className="text-[30px] cursor-pointer ml-[10px]">
                                <TbMath/>
                            </button>
                        </div>
                    </div>


                    <div className="flex items-center w-full h-[50px] bg-[#14518b] relative p-[20px]">
                        <select className="bg-white absolute right-[20px]" onChange={(e) => handleChange(e, {typeChange : true})}>
                            <option value={1}>Trắc Nghiệm</option>
                            <option value={2}>Đúng Sai</option>
                            <option value={3}>Trả lời ngắn</option>
                            <option value={4}>Coding</option>
                        </select>
                    </div>
                </div>
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

// function CreateContest() {
//     function Add() {
//         // const newQuestion : Question = {
//         //     type : 1,
//         //     question : "",
//         //     options : ["","","",""]
//         // }
//         // setQuestionList(t => [...t, newQuestion]);
//         // setIdQuestionList(t => [...t, numOfQuestion]);
//         // setNumOfQuestion(t => t + 1);
//         // setResult(t => [...t, ""]);
//     }

// //     // function remove(index : number) {
// //     //     setQuestionList(prevQuestionList => {
// //     //         const newList = prevQuestionList.filter((_, i) => i !== index);
// //     //         return newList;
// //     //     });

// //     //     setResult(prevResult => {
// //     //         const newResultList = prevResult.filter((_, i) => i !== index);
// //     //         return newResultList;
// //     //     })

// //     //     setIdQuestionList(prevIdQuestionList => {
// //     //         const newIdList = prevIdQuestionList.filter((_, i) => i !== index);
// //     //         return newIdList;
// //     //     });
// //     // }
// const [questionList, setQuestionList] = useState<Question[]>([]);


//     return (
//         <div className="w-full h-full relative px-[5%] flex">
//             <button className="w-[100px] h-[100px] text-[50px] 
//             fixed right-[5%] bottom-[5%] shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[50%]
//             cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] duration-[0.2s]" onClick={Add}>+</button>
//             <div className="w-[80%] h-full">
//                 {
//                     questionList.map((question, index) => (
//                         <div className="w-full mb-[20px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
//                             <div className="p-[20px] flex items-center w-full h-[50px] bg-[#14518b] relative">
//                                 <p className="text-[25px] text-white font-bold">{index + 1} { }</p>
//                                 {/* <button onClick={() => remove(index)} className="text-[50px] text-white font-bold cursor-pointer absolute right-0">
//                                     <IoIosClose />
//                                 </button> */}
//                             </div>

//                             <div className="p-[20px] border-b-[1px] border-b-[#ccc] relative">
//                                 {/* <textarea placeholder="Nhập câu hỏi"
//                                 className="w-full outline-none text-[30px] border-b-[1px] border-b-[#ccc] mb-[20px]"
//                                 onInput={(e) => {
//                                     e.target.style.height = 'auto';
//                                     e.target.style.height = `${e.target.scrollHeight}px`;
//                                 }}
//                                 value={question.question}
//                                 onChange={(e) => handleChange(e, index, {questionChange : true})}
//                                 /> */}

//                                 {/* <MultipleChoiceCreateUI index1={index} index2={i} id={index} setAnswer={setResult}/> */}

                                

//                                 {question.type == 1 || question.type == 2 ? (
//                                     <>
//                                         <div 
//                                         className={`w-full grid ${question.type == 1 ? 
//                                             'grid-cols-[20%_80%]' : 
//                                             'grid-cols-[80%_20%]'} text-[20px] mb-[40px]`}
//                                         >
//                                             {Array.from({ length: 4 }).map((_, i) => (
//                                                 <>

//                                                     {/* <MultipleChoiceCreateUI index1={index} index2={i} id={idQuestionList[index]} setAnswer={setResult}/> */}
//                                                     {/* <TrueFalseQuestionUI index={i} id={index} setAnswer={setResult}/>
//                                                     question.type == 1 ?
//                                                     MultipleChoiceCreateUI(i, idQuestionList[index], {setResult()}) : 
//                                                     TrueFalseQuestionUI(i, idQuestionList[index])} */}
//                                                 </>
//                                             ))}
//                                         </div>
//                                     </>
//                                 ) : ""}

//                                 {/* {question.type == 3 ? (
//                                     <>
//                                         <input type="text" 
//                                         placeholder="Ghi đáp" 
//                                         className="w-full h-[50px] text-[25px] outline-none border-[1px] border-[#ccc] p-[20px] mb-[40px] rounded-[5px]"/>
//                                     </>
//                                 ) : ""}

//                                 {question.type == 4 ? createCodingQuestionUI() : ""} */}

//                                 <button 
//                                 className="absolute right-[20px] bottom-[20px] text-[30px] cursor-pointer mt-[20px]">
//                                     <TbMath />
//                                 </button>
//                             </div>
                                
//                             {/* <div className="flex items-center w-full h-[50px] bg-[#14518b] relative p-[20px]">
//                                 <select className="bg-white absolute right-[20px]" onChange={(e) => handleChange(e, index, {typeChange : true})}>
//                                     <option value="1">Trắc Nghiệm</option>
//                                     <option value="2">Đúng Sai</option>
//                                     <option value="3">Trả lời ngắn</option>
//                                     <option value="4">Coding</option>
//                                 </select>
//                             </div> */}
//                         </div>
//                     ))
//                 }
//             </div>

//             {/* <div className="w-[20%] fixed right-[2%]">
//                 <button className="w-full h-[50px] border-[1px] mb-[20px] cursor-pointer text-[25px]
//                 bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
//                 hover:text-[#14518b] duration-[0.1s]">Xem Trước</button>
//                 <button className="w-full h-[50px] border-[1px] cursor-pointer text-[25px]
//                 bg-[#14518b] font-bold text-white rounded-[5px] border-[#14518b] hover:bg-[white] hover:border-[1px]
//                 hover:text-[#14518b] duration-[0.1s]" onClick={handleSubmit}>Xuất</button>
//             </div> */}
//         </div>  
//     )
// }

export default {
    CreateHub,
    // CreateContest,
    CreateProblem
}
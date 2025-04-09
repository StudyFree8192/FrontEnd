import { forwardRef, PropsWithChildren, useRef } from "react";
import "./Radio.css"
import {MultipleChoiceQuestion, TextQuestion, CodingQuestion} from "../api/QuestionApi";

export const MultipleChoice = forwardRef<HTMLDivElement, PropsWithChildren<any>>(
    function MultipleChoice(props, ref) {
        const data : MultipleChoiceQuestion = props.question;
        const ID = data.id;
        return (
            <div className="w-full rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] mb-[20px] overflow-hidden"
            key = {ID}
            ref={ref}>
                <h1 className="p-[20px] text-[30px] border-b-[2px] border-b-[#ccc] mb-[10px]">{data.question}</h1>

                <div className="p-[20px]">
                    {
                        data.options.map((option, index) => (
                            <p className="text-[25px]" key={index}>
                                {String.fromCharCode(65 + index)}. {option}
                            </p>
                        ))
                    }
                </div>

                <div className="w-full h-[60px] bg-[#14518b] flex items-center pl-[20px]">
                    <form className="Radio">
                        {
                            data.options.map((option,index) => (
                                <>
                                    <input type="radio" className="hidden" name={ID.toString()} id={`${option}-${ID}`}
                                    onChange={() => props.onChange?.(ID, (index + 1).toString())}
                                    key={index}
                                    />
                                    <label 
                                    className="relative rounded-[50%] bg-[white] py-[10px] px-[15px] mr-[20px] cursor-pointer font-bold"
                                    htmlFor={`${option}-${ID}`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </label>
                                </>
                            ))
                        }
                    </form>
                </div>
            </div>
        )
    }
);

export const TrueFalseChoice = forwardRef<HTMLDivElement, PropsWithChildren<any>>(
    function TrueFalseChoice(props, ref) {
        const data : MultipleChoiceQuestion = props.question;
        const AnswerList = useRef<string[]>(Array(data.options.length).fill(""));
        const ID = data.id;

        function convertToString(index : number, value : string) {
            AnswerList.current[index] = value;
            let Result = "";
            for (let i = 0; i < AnswerList.current.length; i++) {
                Result += `${AnswerList.current[i]}`;
                if (i != AnswerList.current.length - 1) Result += "-";
            }
            return Result;
        }
        return (
            <div className={`w-full rounded-[10px] p-[20px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] mb-[20px]`} 
            key={ID}
            // style={{background : color || 'white'}}
            ref={ref}>
                <h1 className="text-[30px] border-b-[2px] border-b-[#ccc] mb-[10px]">{data.question}</h1>

                <div className="flex flex-col gap-4">
                {data.options.map((option, index) => (
                    <div key={index} className="flex w-full">
                        <div className="flex-grow p-4 w-[60%]">
                            <p className="text-[25px]">{option}</p>
                        </div>
                        <div className="p-4 w-[40%] flex items-center">
                            <input type="radio" name={`${ID}-${index}`} id = {`${index}-${ID}-1`} 
                            className="mr-[10px] w-[25px] h-[25px] cursor-pointer"
                            onChange={() => props.onChange?.(ID, convertToString(index, "True"))}
                            />
                            <label htmlFor={`${index}-${ID}-1`} className="cursor-pointer text-[20px]">Đúng</label>
                            <input type="radio" name={`${ID}-${index}`} id = {`${index}-${ID}-0`} 
                            className="ml-[15px] mr-[10px] w-[25px] h-[25px] cursor-pointer"
                            onChange={() => props.onChange?.(ID, convertToString(index, "False"))}
                            />
                            <label htmlFor={`${index}-${ID}-0`} className="cursor-pointer text-[20px]">Sai</label>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )
    }
);

export const ShortAnswer = forwardRef<HTMLDivElement, PropsWithChildren<any>>(
    function ShortAnswer(props, ref) {
        const data : TextQuestion = props.question;
        const ID = data.id;
        return (
            <div className={`w-full rounded-[10px] p-[20px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] mb-[20px]`} 
            // style={{background : color || 'white'}}
            key={ID}
            ref={ref}>
                <h1 className="text-[30px] border-b-[2px] border-b-[#ccc] mb-[10px]">{data.question}</h1>

                <input type="text" className="w-full h-[50px] border-[1px] border-[#ccc] rounded-[5px] outline-none p-[20px] text-[20px]"
                onChange={(e) => props.onChange?.(ID, e.target.value)}
                />
            </div>
        )
    }
);

export const Coding = forwardRef<HTMLDivElement, PropsWithChildren<any>>(
    function Coding(props, ref) {
        const data : CodingQuestion = props.question;
        const ID = data.id;

        function handleCopy(text : any) {
            navigator.clipboard.writeText(text);
        }

        return (
            <div key={ID} ref={ref}>
                <p className="text-[25px] mb-[20px]">{data.topic}</p>

                <div className="mb-[20px]">
                    <p className="text-[30px] font-bold border-b-[1px] border-b-[#ccc] mb-[20px]">Input</p>
                    <p className="text-[25px]">{data.input}</p>
                </div>

                <div className="mb-[30px]">
                    <p className="text-[30px] font-bold border-b-[1px] border-b-[#ccc] mb-[20px]">Output</p>
                    <p className="text-[25px]">{data.output}</p>
                </div>

                <div>
                    {
                        data.example.map((ex : String[]) => (
                            <div className="mb-[40px]">
                                <p 
                                className="text-[30px] font-bold border-b-[1px] border-b-[#ccc] mb-[20px]">
                                    Input Sample
                                </p>
                                <div className="w-full h-full 
                                    border-[1px] border-[#ccc] bg-[#f8f8f8] rounded-[10px]
                                    p-[20px] text-[20px] relative overflow-hidden">
                                        <button className="absolute right-0 top-0 bg-white w-[10%] 
                                        border-[#ccc] border-b-[1px] border-l-[1px] rounded-bl-[10px] cursor-pointer"
                                        onClick={() => handleCopy(ex[0])}
                                        >Copy</button>
                                    <p>{ex[0]}</p>
                                </div>

                                <p 
                                className="text-[30px] font-bold border-b-[1px] border-b-[#ccc] mb-[20px] mt-[20px]">
                                    Output Sample
                                </p>
                                <div className="w-full h-full 
                                    border-[1px] border-[#ccc] bg-[#f8f8f8] rounded-[10px]
                                    p-[20px] text-[20px] relative overflow-hidden">
                                        <button className="absolute right-0 top-0 bg-white w-[10%] 
                                        border-[#ccc] border-b-[1px] border-l-[1px] rounded-bl-[10px] cursor-pointer"
                                        onClick={() => handleCopy(ex[1])}>Copy</button>
                                    <p>{ex[1]}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
            </div>
        )
    }
)
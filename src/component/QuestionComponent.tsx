import { forwardRef, PropsWithChildren, useRef } from "react";

interface MultipleChoiceProps {
    question : string;
    options : [string, string, string, string];
    color ?: string,
    ID : number,
    onChange : (id : number, value : string) => void;
};

interface ShortAnswerProps {
    question : string,
    ID : number,
    color ?: string,
    onChange : (id : number, value : string) => void;
}

export const MultipleChoice = forwardRef<HTMLDivElement, PropsWithChildren<MultipleChoiceProps>>(
    function MultipleChoice({question, options, ID, onChange, color}, ref) {
        return (
            <div className={`w-[500px] rounded-[10px] p-[20px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] mb-[20px]`} 
            style={{background : color || 'white'}}
            ref={ref}>
                <h1 className="text-[30px] border-b-[2px] border-b-[#ccc] mb-[10px]">{question}</h1>
                <div className="mb-[20px]">
                    {options.map((option, index) => (
                        <div className="flex items-center">
                            <input type="radio" name={ID.toString()} id = {`${option}-${ID}`} 
                                className="mr-[10px] w-[25px] h-[25px] cursor-pointer"
                                onChange={() => onChange?.(ID, index.toString())}
                            />
                            <label htmlFor={`${option}-${ID}`} className="text-[25px] cursor-pointer"
                            >{option}</label>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
);

export const TrueFalseChoice = forwardRef<HTMLDivElement, PropsWithChildren<MultipleChoiceProps>>(
    function TrueFalseChoice({question, options, ID, onChange, color}, ref) {
        // let AnswerList : string[] = Array(options.length).fill("");

        const AnswerList = useRef<string[]>(Array(options.length).fill(""));
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
            <div className={`w-[500px] rounded-[10px] p-[20px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] mb-[20px]`} 
            style={{background : color || 'white'}}
            ref={ref}>
                <h1 className="text-[30px] border-b-[2px] border-b-[#ccc] mb-[10px]">{question}</h1>

                <div className="flex flex-col gap-4">
                {options.map((option, index) => (
                    <div key={index} className="flex w-full">
                        <div className="flex-grow p-4 w-[60%]">
                            <p className="text-[25px]">{option}</p>
                        </div>
                        <div className="p-4 w-[40%] flex items-center">
                            <input type="radio" name={`${ID}-${index}`} id = {`${index}-${ID}-1`} 
                            className="mr-[10px] w-[25px] h-[25px] cursor-pointer"
                            onChange={() => onChange?.(ID, convertToString(index, "True"))}
                            />
                            <label htmlFor={`${index}-${ID}-1`} className="cursor-pointer text-[20px]">Đúng</label>
                            <input type="radio" name={`${ID}-${index}`} id = {`${index}-${ID}-0`} 
                            className="ml-[15px] mr-[10px] w-[25px] h-[25px] cursor-pointer"
                            onChange={() => onChange?.(ID, convertToString(index, "False"))}
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

export const ShortAnswer = forwardRef<HTMLDivElement, PropsWithChildren<ShortAnswerProps>>(
    function ShortAnswer({question, ID, onChange, color}, ref) {
        return (
            <div className={`w-[500px] rounded-[10px] p-[20px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] mb-[20px]`} 
            style={{background : color || 'white'}}
            ref={ref}>
                <h1 className="text-[30px] border-b-[2px] border-b-[#ccc] mb-[10px]">{question}</h1>

                <input type="text" className="w-full h-[50px] border-[1px] border-[#ccc] rounded-[5px] outline-none p-[20px] text-[20px]"
                onChange={(e) => onChange?.(ID, e.target.value)}
                />
            </div>
        )
    }
);
import questionInterface from "../api/QuestionApi";
import { TbMath } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { textareaHeight } from "../utils/inputUtils";

type Props = {
    Question : questionInterface
    setAnswer : (answer : questionInterface) => void;
}

function ChoiceQuestionBuilder({Question, setAnswer} : Props) {
    if (Question.type == 3 || Question.type == 4) return "";

    function handleChangeAnswer(index : number, text : string = "") {
        if (Question.type == 3 || Question.type == 4) return Question;
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
        if (Question.type == 3 || Question.type == 4) return Question;
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
                                onChange={() => setAnswer(handleChangeAnswer(index))}/>
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

                                {/* True */}
                                <input type="radio" 
                                name={`${Question.id}-${index}`}
                                id={`${Question.id}-${index}-True`} 
                                onChange={(e) => setAnswer(handleChangeAnswer(index, "True"))}
                                className="w-[50px] h-[50px] ml-[20px] cursor-pointer"/>
                                <label htmlFor={`${Question.id}-${index}-True`} className="text-[20px] ml-[5px] cursor-pointer">Đúng</label>
                                
                                {/* False */}
                                <input type="radio" name={`${Question.id}-${index}`} 
                                id={`${Question.id}-${index}-False`}
                                onChange={() => setAnswer(handleChangeAnswer(index, "False"))}
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

function CodingQuestionBuiler() {
    return (
        <>
            
        </>
    )
}

export function RenderAnswerInput(props : {
    question : questionInterface,
    updateAnswer : (q : questionInterface) => void
}) {
    const question = props.question;;
    const questionType = question.type;
    if (questionType == 1 || questionType == 2) 
        return (
            <>
                <ChoiceQuestionBuilder 
                Question={question}
                // setAnswer={(updateQuestion) => updateAnswer(updateQuestion)}
                setAnswer={(q) => props.updateAnswer(q)}
                />
            </>
        );

    else if (questionType == 3) {
        return (
            <div className="mb-[20px]">
                <input type="text" 
                placeholder="Nhập Đáp Án"
                className="border-[1px] border-[#ccc] w-full text-[25px] p-[20px] outline-none rounded-[5px]"
                onChange={(e) => props.updateAnswer(e.target.value)}
                />
            </div>
        )
    }

    else return (
        <>
        
        </>
    )
}

export function QuestionTypeSelector(props : {
    onChange : (e : any) => void;
}) {
    return (
        <div className="flex items-center w-full h-[50px] bg-[#14518b] relative p-[20px]">
            <select className="bg-white absolute right-[20px]" 
            onChange={(e) => props.onChange(e)}
            >
                <option value={1}>Trắc Nghiệm</option>
                <option value={2}>Đúng Sai</option>
                <option value={3}>Trả lời ngắn</option>
                <option value={4}>Coding</option>
            </select>
        </div>
    )
}

function AddOptions(Question : questionInterface) : questionInterface {
    if (Question.type !== 3 && Question.type !== 4) {
        const newOptions = [...Question.options];
        newOptions.push("");

        if (Question.type == 2) {
            let newAnswerTrueFalse : string = Question.answer;

            if (Question.options.length != 0) newAnswerTrueFalse += "-";
            return { ...Question, options: newOptions, answer: newAnswerTrueFalse };
        }
        return { ...Question, options: newOptions };
    }
    return Question;
}

export function ToolCreate(props : {
    question : questionInterface,
    onClick : (value : questionInterface) => void
}) {
    const questionType = props.question.type;
    const onClick = props.onClick;
    return (
        <div>
            {questionType != 4 && questionType != 3 ? (
                <button className="text-[30px] cursor-pointer" 
                onClick={() => onClick(AddOptions(props.question))}
                >
                    <IoMdAdd />
                </button>
            ) : ""}
                                
            <button className="text-[30px] cursor-pointer ml-[10px]"
            // onClick={() => onClick(2)}
            >
                <TbMath/>
            </button>
        </div>
    );
};
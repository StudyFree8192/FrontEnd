import { useState } from "react";
import * as QuestionComponent from "../component/QuestionComponent"

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

    // const ABC : string[] = ["1","True-False-True-False","Chicken"];

    const QuestionsList : Question[] = [
        {
            type : 1,
            question : "What is your favorit food?",
            options : ["Chicken","Beff stack","Pizza","Potato"]
        },

        {
            type : 2,
            question : "What is your favorit food?",
            options : ["Chicken","Beff stack","Pizza","Potato"]
        },

        {
            type : 3,
            question : "What is your favorit food?"
        }
    ]

    const [answer, setAnswer] = useState<string[]>(Array(QuestionsList.length).fill(""));

    const handleAnswerChange = (id : number, value : string) => {
        const newAnswer : string[] = answer;
        newAnswer[id] = value;
        setAnswer(newAnswer);
    }

    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(answer);
    }

    return (
        <div className="flex flex-col items-center mt-[10px] overflow-hidden">
            <form onSubmit={handleSubmit}>
                {QuestionsList.map((question, index) => {
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
                })}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
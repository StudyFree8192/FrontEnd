import { Link, useLocation } from "react-router-dom"
import questionInterface from "../api/QuestionApi";

export default function Testcase() {
    const pathName = useLocation();
    const answer : string[] = pathName.state.answer;
    const nameProblem : string = pathName.state.nameProblem;
    const path : string = pathName.state.path;
    const questionsList : questionInterface[] = pathName.state.questionsList;
    function CheckAnswer(index : number) {
        if (questionsList[index].type != 4)
            if (answer[index].toLowerCase() == questionsList[index].answer.toLowerCase()) return <span className="text-[green]">Accept</span>
        
        return <span className="text-[red]">Decline</span>
    }

    return (
        <div className="px-[5%]">
            <div className="mb-[30px] pb-[20px] border-b-[1px] border-b-[#ccc]">
                <h1 className="text-[40px]">Submit to <Link 
                to={path} className="text-[#1958c1] underline">{nameProblem}</Link>
                </h1>
            </div>

            <div>
                {
                    questionsList.map((_, index) => (
                        <h1 className="text-[25px] font-bold">Test #{index + 1}: {CheckAnswer(index)}</h1>
                    ))
                }
            </div>
        </div>
    )
}
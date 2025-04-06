import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

export default function Testcase() {
    const pathName = useLocation();
    const answer : string[] = pathName.state.answer;
    const resultOfProblem : string[] = pathName.state.resultOfProblem;
    const nameProblem : string = pathName.state.nameProblem;
    const path : string = pathName.state.path;
    const questionsList : string[] = pathName.state.questionsList;
    function CheckAnswer(index : number) {
        if (answer[index].toLowerCase() == resultOfProblem[index].toLowerCase()) return <span className="text-[green]">Accept</span>
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
                    questionsList.map((ans, index) => (
                        <h1 className="text-[25px] font-bold">Test #{index + 1}: {CheckAnswer(index)}</h1>
                    ))
                }
            </div>
        </div>
    )
}
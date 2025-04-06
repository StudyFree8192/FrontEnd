import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../utils/Table.css"
import { Link } from "react-router-dom";

export default function Problems() {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    let page : number = parseInt(queryParams.get("page") || "1");

    const [problems, setProblems] = useState<any[]>();

    function handleOnClickLeft() {
        let nextpage = page - 1;
        navigate(`/Problem/?page=${nextpage}`);
    }

    function handleOnClickRight() {
        let nextpage = page + 1;
        navigate(`/Problem/?page=${nextpage}`);
    }

    const path = window.location.pathname;
    const parts = path.split("/");
    
    useEffect(() => {
        async function getData() {
            await axios.post(`http://localhost:8192/problems`, {
                type : parts[1].toLowerCase(),
                page : page,
                maxProblem : 10
            })
            .then(res => {
                setProblems(res.data);
            })
            .catch(error => console.log(error));
        }

        getData();
        
    }, [page, parts[1]]);

    function checkProblemPage() : boolean {
        if (parts[1].toLowerCase() == "problem") return true;
        return false;
    }

    function handleForm(Type : number) {
        if (checkProblemPage()) {
            switch (Type) {
                case 1: return "Trắc Nghiệm";
                case 2: return "Đúng sai";
                case 3: return "Trả lời ngắn";
                case 4: return "Lập trình";
            }
        }

        switch (Type) {
            case 1: return "Trên giấy";
            case 2: return "Lập trình";
        }
        
        
    }

    
    
    return (
        <div className="px-[5%] pt-[2%] text-[20px]">
            <h1 className="text-[40px] border-b-[1px] border-b-[#ccc] pb-[10px]">{checkProblemPage() ? "Bài Tập" : "Kì Thi"}</h1>
            
            <table className="w-[70%] table-auto border-collapse text-center mt-[20px]">
                <thead>
                <tr className="bg-[#14518b] text-white">
                    <th>ID</th>
                    {checkProblemPage() ? <th>Bài Tập</th> : ""}
                    <th>Kỳ Thi</th>
                    <th>Môn học</th>
                    <th>Hình Thức</th>
                    <th>Hoàn Thành</th>
                </tr>
                </thead>
                
                <tbody>
                    {
                        problems?.map((problem, index) => (
                            <tr className={`${index % 2 == 0 ? "bg-[#f2f2f2]" : ""} hover:bg-[#ddd]`} key={index}>
                                 <td>
                                    <Link to={`/${checkProblemPage() ? "Problem" : "Contest"}/${problem._id}`}
                                        // className="text-[#4493F8]"
                                        className="text-[#1958c1] hover:underline"
                                     >
                                            {problem._id.slice(-5)}
                                     </Link>
                                </td>

                                
                                {checkProblemPage() ? <td>
                                     <Link to={`/Problem/${problem._id}`}
                                        // className="text-[#4493F8]"
                                        className="text-[#1958c1] hover:underline"
                                     >
                                        {problem.name}
                                     </Link>
                                 </td> : ""}
                                 
                                 {checkProblemPage() ? 
                                 <td>{!problem.Contest ? "Chưa Phân Loại" : problem.Contest}</td>
                                    : <td>
                                        <Link to={`/Contest/${problem._id}`}
                                        className="text-[#1958c1] hover:underline">
                                            {problem.nameContest}
                                        </Link>
                                    </td>
                                }

                                 <td>{problem.subject}</td>
                                 <td>
                                    {handleForm(problem.Type)}
                                </td>

                                <td className="text-[red]">Nope</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
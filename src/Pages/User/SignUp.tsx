import axios from "axios";
import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState(Array(4).fill(""));

    function handleChange(e : React.FormEvent<HTMLFormElement>, index : number) {
        // console.log(formData[index]);
        formData[index] = e.target.value;
        setFormData(formData);
    }


    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post("http://localhost:8192/auth/signUp", {
            username : formData[0], 
            email : formData[1], 
            password : formData[2], 
            reEnterPassword : formData[3]
        }).then(res => console.log(res)).catch(err => console.log(err));
    }

    const FormRegisters = [
        {
            label : "Tên Đăng Nhập",
            type : "text",
            name : "username"
        },
        {
            label : "Email",
            type : "email",
            name : "email"
        },
        {
            label : "Mật Khẩu",
            type : "password",
            name : "password"
        },
        {
            label : "Nhập lại mật khẩu",
            type : "password",
            name : "confirmPassword"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col p-[20px] px-[50px]">
            <div className="border-b border-[rgba(0,0,0,0.2)] text-[30px] pb-[10px]">
                <h1>Đăng Ký</h1>
            </div>

            <div className="flex-1 w-full h-full flex justify-center">
                <form 
                onSubmit={handleSubmit}
                className="w-[50%] mt-[50px] relative">
                    {FormRegisters.map((Register, index) => (
                        <div className="mb-[20px]">
                            <label className="text-[25px] font-bold">{Register.label}</label>
                            <br />
                            <input className="w-full h-[40px] outline-none border-[1px] border-[#ccc]
                            p-[20px] text-[20px]" 
                            type={Register.type} 
                            onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    ))}

                    <button className="w-[100px] h-[50px] 
                        bg-linear-to-b from-[#337ab7] to-[#265a88]
                        text-[white] rounded-[5px]
                        cursor-pointer absolute right-0
                        text-[20px]" 
                        type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    )
}
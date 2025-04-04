import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import axios from "axios";

export default function SignIn() {
    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <div className="w-full h-full flex flex-col p-[20px] px-[50px]">
            <div className="border-b border-[rgba(0,0,0,0.2)] text-[30px] pb-[10px]">
                <h1>Đăng Nhập</h1>
            </div>

            <div className="flex-1 flex flex-col items-center mt-[100px]">
                <div className="w-[25%] h-[30%] bg-[#F8F8F8] border-[2px] border-[#ccc] rounded-[10px]
                flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[10px] mt-[20px] px-[10px] relative">
                        <div className="w-full flex justify-center items-center">
                            <FaUser className="text-[20px]"></FaUser>
                            <input 
                            className="
                            w-[80%] h-[40px] text-[20px] px-[20px] ml-[20px]
                            bg-[white] border-[1px] border-[#ccc] outline-none
                            rounded-[5px]"
                            type="text" 
                            placeholder="Tên Đăng Nhập"/>
                        </div>

                        <div className="w-full flex justify-center items-center">
                            <FaKey className="text-[20px]"></FaKey>
                            <input 
                            className="
                            w-[80%] h-[40px] text-[20px] px-[20px] ml-[20px]
                            bg-[white] border-[1px] border-[#ccc] outline-none
                            rounded-[5px]"
                            type="password" 
                            placeholder="Mật Khẩu"/>
                        </div>

                        <button className="w-[100px] h-[50px] 
                        bg-linear-to-b from-[#337ab7] to-[#265a88]
                        text-[white] rounded-[5px] absolute right-[35px]
                        bottom-[-65px]
                        cursor-pointer text-[20px]" 
                        type="submit">Login</button>
                    </form>

                </div>

                <div className="w-full">
                    <p>Forgot your password?</p>
                </div>
            </div>
        </div>
    )
}
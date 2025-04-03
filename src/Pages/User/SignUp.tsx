export default function SignUp() {
    const FormRegisters = [
        {
            label : "Tên Đăng Nhập",
            type : "text"
        },
        {
            label : "Email",
            type : "gmail"
        },
        {
            label : "Mật Khẩu",
            type : "password"
        },
        {
            label : "Nhập lại mật khẩu",
            type : "password"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col p-[20px] px-[50px]">
            <div className="border-b border-[rgba(0,0,0,0.2)] text-[30px] pb-[10px]">
                <h1>Đăng Ký</h1>
            </div>

            <div className="flex-1 w-full h-full flex justify-center">
                <form className="w-[50%] mt-[50px] relative">
                    {FormRegisters.map((Register) => (
                        <div className="mb-[20px]">
                            <label className="text-[25px] font-bold">{Register.label}</label>
                            <br />
                            <input className="w-full h-[40px] outline-none border-[1px] border-[#ccc]
                            p-[20px] text-[20px]" type={Register.type}/>
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
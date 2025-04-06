import { Outlet, Link } from "react-router-dom";
import {User} from "./api/User";

export default function App() {
	const LinkPagesLeft = [
		{
			Name : "GIẢI BÀI TẬP",
			href : "/Problem"
		},
	
		{
			Name : "CUỘC THI",
			href : "/Contest"
		},
	
		{
			Name : "TẠO",
			href : "/Create"
		},
	];
	
	const LinkPagesRight = [
		{
			Name : "ĐĂNG NHẬP",
			href : "/SignIn"
		},
	
		{
			Name : "ĐĂNG KÝ",
			href : "/SignUp"
		}
	];

	let isLogin : boolean = false;
	if (document.cookie != "") {
		isLogin = true;
		let cArray = document.cookie.split("; ");
		User.username = cArray[0].slice(9);
	}

	return (
		<div className="w-screen h-screen flex flex-col overflow-x-hidden">
			<div className="w-full h-[75px] bg-[#14518b] flex text-white 
			justify-between text-[20px] fixed z-50">
				<div className="ml-[30px] flex">
					{LinkPagesLeft.map((page, index) => (
						<Link className="hover:bg-[rgba(255,255,255,0.2)] flex items-center p-[10px] justify-center" 
						to={page.href}
						key={index}>
							{page.Name}
						</Link>
					))}
				</div>
				{
					isLogin ? (
						<div className="flex items-center mr-[10px] cursor-pointer hover:bg-[rgba(255,255,255,0.2)] p-[20px]">
							<div className="w-[50px] h-[40px] rounded-[10px] overflow-hidden">
								<img src="avatar.png" className="w-full h-full" alt="" />
							</div>
							<h1 className="ml-[10px]">{User.username}</h1>
						</div>
					) : (
						<div className="mr-[30px] flex gap-[10px]">
							{LinkPagesRight.map((page, index) => (
								<Link className="hover:bg-[rgba(255,255,255,0.2)] flex items-center p-[10px] justify-center font-bold" 
								key={index}
								to={page.href}>{page.Name}</Link>
							))}
						</div>
					)
				}
				
			</div>
			
			<div className="flex-1 relative top-[100px]">
				<Outlet/>
			</div>
		</div>
	)
}
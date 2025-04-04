import { Outlet, Link } from "react-router-dom"

export default function App() {
	const LinkPagesLeft = [
		{
			Name : "GIẢI BÀI TẬP",
			href : "/Solve"
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

	return (
		<div className="w-screen h-screen flex flex-col overflow-x-hidden">
			<div className="w-full h-[75px] bg-[#14518b] flex text-white 
			justify-between text-[20px]">
				<div className="ml-[30px] flex">
					{LinkPagesLeft.map((page, index) => (
						<Link className="hover:bg-[rgba(255,255,255,0.2)] flex items-center p-[10px] justify-center" 
						to={page.href}
						key={index}>
							{page.Name}
						</Link>
					))}
				</div>

				<div className="mr-[30px] flex gap-[10px]">
					{LinkPagesRight.map((page, index) => (
						<Link className="hover:bg-[rgba(255,255,255,0.2)] flex items-center p-[10px] justify-center font-bold" 
						key={index}
						to={page.href}>{page.Name}</Link>
					))}
				</div>
			</div>
			
			<div className="flex-1">
				<Outlet/>
			</div>
		</div>
	)
}
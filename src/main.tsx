import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from "./Pages/Menu.tsx";
import NotFound from './Pages/NotFound.tsx'
import Problems from './Pages/Problems.tsx'
import Create from './Pages/Create.tsx'
import SignIn from './Pages/User/SignIn.tsx'
import SignUp from './Pages/User/SignUp.tsx'
import Exercise from './Pages/Exercise.tsx'
import Testcase from './Pages/Testcase.tsx'
import MathUI from './utils/MathUI.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App/>}>
					<Route path='/' element={<Menu/>}/>
					<Route path='/Problem' element={<Problems/>}></Route>
					<Route path='/Contest' element={<Problems/>}></Route>
					<Route path='/Create' element={<Create.CreateHub/>}></Route>
					<Route path='/SignIn' element={<SignIn/>}></Route>
					<Route path='/SignUp' element={<SignUp/>}></Route>
					<Route path='/Problem/:id' element={<Exercise/>}></Route>
					<Route path='/Contest/:id' element={<Exercise/>}></Route>
					<Route path='/Problem/:id/Submit' element={<Testcase/>}></Route>
					<Route path='/Contest/:id/Submit' element={<Testcase/>}></Route>
					<Route path='/test' element={<MathUI/>}></Route>
					<Route path='/Create/Contest' element={<Create.CreateContest/>}></Route>
					<Route path='/Create/Problem' element={<Create.CreateProblem/>}></Route>
					<Route path='*' element={<NotFound/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)

import "./App.css";
import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { Mypage } from "./pages/MyPage";
import { UserCreateChallenge } from "./pages/UserCreateChallenge";
import { UserCompleteChallenge } from "./pages/UserCompleteChallenge";
import { UserPasswordChange } from "./pages/UserPasswordChange";
import { UserProfileEdit } from "./pages/UserProfileEdit";
import { Footer } from "./components/Footer";
import { MainHeader } from "./components/Header";
import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";

const Overlaps = () => {
	return (
		<>
			<MainHeader />
			<Outlet />
			<Footer />
		</>
	);
};

const OverlapEmp = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

const OverlapFoo = () => {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
};

const OverlapHead = () => {
	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Routes>
					{/* 아무것도 고정 안 된 빈 페이지  */}
					<Route element={<OverlapEmp />}>
						<Route path="/userCreate" element={<UserCreateChallenge />} />
						<Route path="/userComplete" element={<UserCompleteChallenge />} />
						<Route path="/changePw" element={<UserPasswordChange />} />
						<Route path="/editProfile" element={<UserProfileEdit />} />
					</Route>
					{/* header + footer 고정된 페이지 */}
					<Route element={<Overlaps />}>
						<Route path="/" element={<Home />} />
						{/* 마이페이지
							커뮤니티 */}
					</Route>
					{/* footer 고정된 페이지 */}
					<Route element={<OverlapFoo />}>
						<Route path="/mypage" element={<Mypage />} />
					</Route>
					<Route element={<OverlapHead />}>
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
					</Route>
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;

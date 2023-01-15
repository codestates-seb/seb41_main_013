import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Mypage } from "./pages/MyPage";
import { UserCreateChallenge } from "./pages/UserCreateChallenge";
import { UserCompleteChallenge } from "./pages/UserCompleteChallenge";
import { UserPasswordChange } from "./pages/UserPasswordChange";
import { UserProfileEdit } from "./pages/UserProfileEdit";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mypage" element={<Mypage />} />
					<Route path="/userCreate" element={<UserCreateChallenge />} />
					<Route path="/userComplete" element={<UserCompleteChallenge />} />
					<Route path="/changePw" element={<UserPasswordChange />} />
					<Route path="/editProfile" element={<UserProfileEdit />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;

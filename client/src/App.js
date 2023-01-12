import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { Mypage } from "./pages/MyPage";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Mypage />
			</div>
		</ThemeProvider>
	);
}

export default App;

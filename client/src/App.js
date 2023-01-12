import "./App.css";
import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { MainHeader } from "./components/Header";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<MainHeader />
			</div>
		</ThemeProvider>
	);
}

export default App;

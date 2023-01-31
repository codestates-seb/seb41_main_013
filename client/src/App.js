import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { OurPath } from "./router/Router";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<OurPath />
			</div>
		</ThemeProvider>
	);
}

export default App;

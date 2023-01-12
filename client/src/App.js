import theme from "./components/theme";
import { ThemeProvider } from "styled-components";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App"></div>
		</ThemeProvider>
	);
}

export default App;

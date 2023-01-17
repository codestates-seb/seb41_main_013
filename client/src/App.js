import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { Router } from "./router/Router";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Router />
			</div>
		</ThemeProvider>
	);
}

export default App;

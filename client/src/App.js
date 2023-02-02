import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { Router } from "./router/Router";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router />
		</ThemeProvider>
	);
}

export default App;

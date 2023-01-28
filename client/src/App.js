import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { OurPath } from "./router/Router";

function App() {
	return (
		<ThemeProvider theme={theme}>
				<OurPath />
		</ThemeProvider>
	);
}

export default App;

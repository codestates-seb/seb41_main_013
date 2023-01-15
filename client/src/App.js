import theme from "./components/theme";
import { ThemeProvider } from "styled-components";

import Community from "./pages/Community";
import { MainHeader } from "./components/Header";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Community />
			</div>
		</ThemeProvider>
	);
}

export default App;

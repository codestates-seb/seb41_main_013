import theme from "./components/theme";
import { ThemeProvider } from "styled-components";

import { CreatePost } from "./pages/CreatePost";
import { MainHeader } from "./components/Header";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<CreatePost category="운동" />
			</div>
		</ThemeProvider>
	);
}

export default App;

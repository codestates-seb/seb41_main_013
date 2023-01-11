import "./App.css";
import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Button>예시</Button>
			</div>
		</ThemeProvider>
	);
}

const Button = styled.button`
	background-color: ${(props) => props.theme.color.green};
`;

export default App;

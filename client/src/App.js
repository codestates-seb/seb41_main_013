import theme from "./components/theme";
import { ThemeProvider } from "styled-components";
import { MainHeader, TitleHeader } from "./components/Header";
import { HomeCategory } from "./components/Category";
import { Footer } from "./components/Footer";
import { NavTitle } from "./components/NavItem";
import {
	ChallengeState,
	CompleteChallenge,
	CreateChallenge,
} from "./components/Challenge";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<MainHeader />
				<br />
				<TitleHeader title="챌린지 생성하기" />
				<br />
				<NavTitle title="완료한 챌린지" />
				<br />
				<HomeCategory />
				<br />
				<Footer />
				<br />
				<ChallengeState />
				<br />
				<CompleteChallenge />
				<br />
				<CreateChallenge />
			</div>
		</ThemeProvider>
	);
}

export default App;

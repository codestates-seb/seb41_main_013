import "./App.css";
import theme from "./components/theme";
import { ThemeProvider } from "styled-components";

//components
import { Modal, OneBtnModal, TwoBtnModal } from "./components/Modal";
import SelectCategory from "./components/Category";
import Comment from "./components/Comment";
import WriterInfo from "./components/WriterInfo";
import PostSummary from "./components/PostSummary";
import Avatar from "./components/Avatar";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<PostSummary />
				<WriterInfo />
				<Comment />
				<SelectCategory />
				<Modal modalText={"modal"} />
				<OneBtnModal modalText={"modal"} btnText={"확인"} />
				<TwoBtnModal
					modalText={"modal"}
					btnTextOrg={"확인"}
					btnTextGry={"취소"}
				/>
				<Avatar />
			</div>
		</ThemeProvider>
	);
}

export default App;

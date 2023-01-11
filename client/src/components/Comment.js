import theme from "./theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Btn from "./Button";

const CommentContainer = styled.div`
	width: 364px;
	height: 52px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 10px;
	line-height: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
/*border: 1px solid #000000;
	border-radius: 8px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.6);*/

const Comment = ({ comment }) => {
	return (
		<ThemeProvider theme={theme}>
			<CommentContainer>
				{comment || "comment"}
				<div>
					<Btn
						btnText={"수정"}
						background={theme.color.green}
						width={"40px"}
						height={"25px"}
						size={"10px"}
					/>
					<Btn
						btnText={"삭제"}
						background={theme.color.gray}
						color={theme.color.navy}
						width={"40px"}
						height={"25px"}
						size={"10px"}
					/>
				</div>
			</CommentContainer>
		</ThemeProvider>
	);
};

export default Comment;

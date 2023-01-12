import theme from "./theme";
import styled, { ThemeProvider } from "styled-components";
import Btn from "./Button";

const CommentContainer = styled.div`
	width: 364px;
	height: 52px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 1rem;
	line-height: 3rem;
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
						width={"4rem"}
						height={"2.5rem"}
						size={"1rem"}
					/>
					<Btn
						btnText={"삭제"}
						background={theme.color.gray}
						color={theme.color.navy}
						width={"4rem"}
						height={"2.5rem"}
						size={"1rem"}
					/>
				</div>
			</CommentContainer>
		</ThemeProvider>
	);
};

export default Comment;

import { useState } from "react";
import theme from "./theme";
import styled from "styled-components";
import { ErrorContainer } from "../pages/CreatePost";

//components
import { Input } from "./Input";
import { Btn } from "./Button";

export const WriteComment = (props) => {
	const [comment, setComment] = useState(props.comment || "");
	const [commentError, setCommentError] = useState(false);

	const handleChangeComment = (e) => {
		setComment(e.target.value);
	};
	const handleCheck = (props) => {
		//글 작성/수정 - 유효성 검사 함수
		if (!comment) setCommentError(true);
		else setCommentError(false);
	};
	return (
		<UpdateCommentContainer>
			<div>
				<Input
					placeholder={props.placeholder || ""}
					lineHeight="3rem"
					fontSize="1.3rem"
					cols="44"
					rows="1"
					margin={props.margin}
					value={comment}
					onChange={handleChangeComment}
					borderColor={commentError && theme.color.red}
				/>
				<ErrorContainer display={commentError}>
					내용을 입력해주세요.
				</ErrorContainer>
			</div>
			<Btn
				btnText="등록"
				background={theme.color.green}
				width={"4rem"}
				height={"2.5rem"}
				size={"1rem"}
				onClick={handleCheck}
				margin={props.margin}
			/>
		</UpdateCommentContainer>
	);
};
const UpdateCommentContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

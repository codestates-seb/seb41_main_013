//댓글에서 수정 버튼 클릭 시 보이는 컴포넌트
import { useState } from "react";
import theme from "./theme";
import styled from "styled-components";
import { ErrorContainer } from "../pages/CreatePost";

//components
import { Input } from "./Input";
import { Btn } from "./Button";
import { Modal, TwoBtnModal } from "../components/Modal";

export const WriteComment = (props) => {
	const user = true; //유저 정보 (from 로컬스토리지)
	const [comment, setComment] = useState(props.comment || "");
	const [commentError, setCommentError] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [createCModal, setCreateCModal] = useState(false);

	const handleChangeComment = (e) => {
		setComment(e.target.value);
	};
	const handleCheck = (props) => {
		//글 작성/수정 - 유효성 검사 함수
		if (!comment) setCommentError(true);
		else {
			setCommentError(false);
			if (!user) {
				//로그인이 되어 있지 않다면
				setCreateModal(true);
				setTimeout(() => {
					setCreateModal(false);
				}, 1000);
				setComment("");
			} else {
				setCreateCModal(true);
			}
		}
	};
	const handleCreateComment = () => {
		//댓글 등록 함수
		setCreateCModal(false);
		setComment("");
	};

	return (
		<UpdateCommentContainer>
			{createModal && <Modal modalText="로그인 이후 댓글 작성이 가능합니다." />}
			{createCModal && (
				<TwoBtnModal
					modalText="댓글 작성을 완료하시겠습니까?"
					btnTextOrg="완료"
					onClickOrg={handleCreateComment}
					btnTextGry="취소"
					onClickGry={() => setCreateCModal(false)}
				/>
			)}
			<div className="input">
				<Input
					placeholder={props.placeholder || ""}
					lineHeight="1.8rem"
					fontSize="1rem"
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
				margin={props.margin || "0"}
			/>
		</UpdateCommentContainer>
	);
};

const UpdateCommentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	.input {
		width: 85%;
	}
`;

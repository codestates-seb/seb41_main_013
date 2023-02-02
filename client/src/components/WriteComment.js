//댓글에서 수정 버튼 클릭 시 보이는 컴포넌트
import { useState } from "react";
import theme from "./theme";
import styled from "styled-components";
import { ErrorContainer } from "../pages/CreatePost";
import axios from "axios";
import { useSelector } from "react-redux";

//components
import { Input } from "./Input";
import { Btn } from "./Button";
import { Modal, TwoBtnModal } from "../components/Modal";

export const WriteComment = (props) => {
	//유저 정보
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);
	const isLogin = useSelector((state) => state.loginStatus.status);
	const accessToken = localStorage.getItem("authorization");

	const [comment, setComment] = useState(props.comment || "");
	const [commentError, setCommentError] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [createCModal, setCreateCModal] = useState(false);

	const handleChangeComment = (e) => {
		setComment(e.target.value);
	};
	const handleCheck = () => {
		//글 작성/수정 - 유효성 검사 함수
		if (!comment) setCommentError(true);
		else {
			setCommentError(false);
			if (!isLogin) {
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
		if (props.func === "create") createComment();
		else if (props.func === "update") updateComment();
		setComment("");
	};

	const createComment = async () => {
		//댓글 생성 함수
		await axios
			.post(
				`${process.env.REACT_APP_SERVER_URL}/api/comments/${props.boardId}`,
				{
					boardId: props.boardId,
					content: comment,
					memberId: loginUserInfo.memberId,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			)
			.catch((error) => {
				console.error(error);
			});
		props.onClick();
	};
	const updateComment = async () => {
		//댓글 수정 함수
		await axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/comments/${props.commentId}`,
				{
					boardId: props.boardId,
					content: comment,
					memberId: loginUserInfo.memberId,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			)
			.catch((error) => {
				console.error(error);
			});
		props.onClick();
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

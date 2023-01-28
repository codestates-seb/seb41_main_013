import theme from "./theme";
import styled from "styled-components";
import { formatDate } from "./PostSummary";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

//components
import { Btn } from "./Button";
import { WriterInfo } from "./WriterInfo";
import { WriteComment } from "./WriteComment";
import { Modal, TwoBtnModal } from "../components/Modal";

//props : 댓글 내용
export const Comment = (props) => {
	//유저 정보
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);
	const isLogin = useSelector((state) => state.loginStatus.status);

	const commentId = props.commentId;
	const [update, setUpdate] = useState(false);
	const [createUModal, setCreateUModal] = useState(false);
	const [createDModal, setCreateDModal] = useState(false);
	const [createDdModal, setCreateDdModal] = useState(false);

	const handleDeleteComment = async () => {
		//댓글 삭제 함수
		setCreateDdModal(false);
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/boards${commentId}`,
				{
					headers: {
						Authorization: `Bearer ${loginUserInfo.accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.status === 200) {
				console.log("댓글 삭제 완료");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreate = (func) => {
		//로그인이 되어 있지 않다면
		if (func === "update") {
			if (!isLogin) {
				setCreateUModal(true);
				setTimeout(() => {
					setCreateUModal(false);
				}, 1000);
			} else {
				setUpdate(true);
			}
		} else {
			if (!isLogin) {
				setCreateDModal(true);
				setTimeout(() => {
					setCreateDModal(false);
				}, 1000);
			} else setCreateDdModal(true);
		}
	};

	return (
		<CommentContainer>
			{createUModal && <Modal modalText="댓글 작성자만 수정이 가능합니다." />}
			{createDModal && <Modal modalText="댓글 작성자만 삭제가 가능합니다." />}
			{createDdModal && (
				<TwoBtnModal
					modalText="정말 삭제하시겠습니까?"
					btnTextOrg="삭제"
					onClickOrg={handleDeleteComment}
					btnTextGry="취소"
					onClickGry={() => setCreateDdModal(false)}
				/>
			)}
			<div className="comment">
				{update || <p>{props.comment}</p>}
				{update || (
					<div>
						<Btn
							btnText={"수정"}
							background={theme.color.green}
							width={"4rem"}
							height={"2.5rem"}
							size={"1rem"}
							onClick={() => handleCreate("update")}
						/>
						<Btn
							btnText={"삭제"}
							background={theme.color.gray}
							color={theme.color.navy}
							width={"4rem"}
							height={"2.5rem"}
							size={"1rem"}
							onClick={() => handleCreate("del")}
						/>
					</div>
				)}
			</div>
			{update && (
				<WriteComment
					comment={props.comment}
					boardId={props.boardId}
					func="update"
					commentId={commentId}
				/>
			)}
			<WriterInfo
				writer={props.writer}
				date={formatDate(props.date)}
				imgURL={props.imgURL}
			/>
		</CommentContainer>
	);
};

const CommentContainer = styled.div`
	width: 100%;
	height: 9.2rem;
	box-sizing: border-box;
	margin-bottom: 1rem;
	border-bottom: 1px solid ${theme.color.gray};

	.comment {
		display: flex;
		align-items: center;
		justify-content: space-between;
		p {
			font-family: "Inter";
			font-style: normal;
			font-weight: 400;
			font-size: 1rem;
			line-height: 5rem;
		}
	}
`;

//글 상세 조회 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//components
import { TitleHeader } from "../components/Header";
import { Btn } from "../components/Button";
import { Comment } from "../components/Comment";
import { WriterInfo } from "../components/WriterInfo";
import { BackToTopBtn } from "../components/Button";
import { WriteComment } from "../components/WriteComment";
import { Modal, TwoBtnModal } from "../components/Modal";
import { NoDataDiv } from "../components/NoData";

export const PostDetail = () => {
	//유저 정보
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);
	const accessToken = localStorage.getItem("authorization");

	const navigate = useNavigate();
	const { boardId } = useParams();
	const category = { 우리동네: 0, 운동: 1, 생활습관: 2, 기타: 3 };

	const [createUModal, setCreateUModal] = useState(false);
	const [createDModal, setCreateDModal] = useState(false);
	const [createDdModal, setCreateDdModal] = useState(false);
	const [hasPostData, setHasPostData] = useState(true);
	const [hasCommentData, setHasCommentData] = useState(true);

	const [post, setPost] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [count, setCount] = useState(0);

	const getPost = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/boards/${boardId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.data.data.length === 0) {
				setHasPostData(false);
			}
			setPost(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getPost();
		getCommentList();
		if (commentList.length !== 0) setHasCommentData(true);
	}, [count, commentList.length]);

	const getCommentList = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/comments/${boardId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.data.data.length === 0) {
				setHasCommentData(false);
			}
			setCommentList(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreate = (func) => {
		//로그인된 유저 정보와 글의 작성자 정보가 다른 경우
		if (func === "update") {
			if (loginUserInfo.memberId !== post.memberId) {
				setCreateUModal(true);
				setTimeout(() => {
					setCreateUModal(false);
				}, 1000);
			} else navigate(`/post/${boardId}/update`);
		} else if (func === "del") {
			if (loginUserInfo.memberId !== post.memberId) {
				setCreateDModal(true);
				setTimeout(() => {
					setCreateDModal(false);
				}, 1000);
			} else setCreateDdModal(true);
		}
	};

	const handleDeletePost = async () => {
		//해당 글을 삭제하는 함수
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/boards/${boardId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.status === 204) {
				navigate("/community");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeCount = () => {
		//렌더링을 위한 함수
		setCount(count + 1);
	};

	return (
		<>
			<PostDetailContainer>
				{createUModal && <Modal modalText="글 작성자만 수정이 가능합니다." />}
				{createDModal && <Modal modalText="글 작성자만 삭제가 가능합니다." />}
				{createDdModal && (
					<TwoBtnModal
						modalText="정말 삭제하시겠습니까?"
						btnTextOrg="삭제"
						onClickOrg={handleDeletePost}
						btnTextGry="취소"
						onClickGry={() => setCreateDdModal(false)}
					/>
				)}
				<TitleHeader
					title={
						String(post.title).length > 10
							? String(post.title).slice(0, 11) + "..."
							: post.title
					}
				/>
				<Btn
					background={theme.color.green}
					size="0.9rem"
					width="13rem"
					height="2rem"
					btnText={`카테고리 > ${post.category}`}
					onClick={() => navigate(`/community/${category[post.category]}`)}
				/>

				<div className="title">{post.title}</div>
				{hasPostData ? (
					<div className="content">{post.content}</div>
				) : (
					<NoDataDiv text="등록된 글이" />
				)}
				<WriterInfo
					writer={post.memberName}
					date={post.createdAt}
					memberId={post.memberId}
				/>
				<div className="btns">
					<Btn
						background={theme.color.green}
						btnText="수정"
						onClick={() => handleCreate("update")}
					/>
					<Btn
						background={theme.color.gray}
						btnText="삭제"
						color={theme.color.navy}
						onClick={() => handleCreate("del")}
					/>
				</div>
				<WriteComment
					margin="1rem 0 1rem 0"
					placeholder="댓글을 입력해주세요."
					boardId={boardId}
					func="create"
					onClick={handleChangeCount}
				/>
				<div className="commentNum">댓글 {commentList.length}</div>
				{hasCommentData ? (
					<div>
						{commentList.map((el) => (
							<div>
								<Comment
									comment={el.content}
									writer={el.memberName}
									date={el.date}
									commentId={el.commentId}
									memberId={el.memberId}
									boardId={boardId}
									onClick={handleChangeCount}
								/>
							</div>
						))}
					</div>
				) : (
					<div className="margin">
						<NoDataDiv text="등록된 댓글이" />
					</div>
				)}
				<BackToTopBtn />
			</PostDetailContainer>
		</>
	);
};

const PostDetailContainer = styled.div`
	font-family: "Inter";
	font-style: normal;

	display: flex;
	flex-direction: column;

	position: absolute;
	left: 0;
	top: 5.2rem;
	bottom: 6.5rem;
	overflow-y: scroll;
	width: 100%;
	padding: 0 1.3rem;

	.title {
		font-weight: 600;
		font-size: 1.4rem;
		line-height: 3rem;
		width: 100%;
	}
	.content {
		white-space: pre-wrap;
		font-weight: 400;
		font-size: 1.3rem;
		line-height: 1.8rem;
	}
	::-webkit-scrollbar {
		display: none;
	}
	.btns {
		text-align: center;
	}
	.commentNum {
		font-weight: 600;
		line-height: 3rem;
	}
	.margin {
		margin-bottom: 1rem;
	}
`;

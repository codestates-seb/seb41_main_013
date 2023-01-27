//글 상세 조회 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

//components
import { TitleHeader } from "../components/Header";
import { Btn } from "../components/Button";
import { Comment } from "../components/Comment";
import { WriterInfo } from "../components/WriterInfo";
import { BackToTopBtn } from "../components/Button";
import { WriteComment } from "../components/WriteComment";
import { Modal, TwoBtnModal } from "../components/Modal";
import { Loading } from "../components/Loading";

//dummy
//import { CommunityList } from "../data/dummy";

export const PostDetail = () => {
	const navigate = useNavigate();
	const { boardId } = useParams();
	const category = ["우리 동네", "운동", "규칙적인 생활", "기타"];
	//const post = CommunityList.filter((el) => el.postId == postId)[0];

	const user = null; //유저 정보 (from 로컬스토리지)
	const [createUModal, setCreateUModal] = useState(false);
	const [createDModal, setCreateDModal] = useState(false);
	const [createDdModal, setCreateDdModal] = useState(false);

	const [post, setPost] = useState({});
	useEffect(() => {
		getPost();
	}, []);
	const getPost = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/boards/${boardId}`,
			);
			setPost(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreate = (func) => {
		//로그인이 되어 있지 않다면
		if (func === "update") {
			if (!user) {
				setCreateUModal(true);
				setTimeout(() => {
					setCreateUModal(false);
				}, 1000);
			} else navigate(`/post/${boardId}/update`);
		} else {
			if (!user) {
				setCreateDModal(true);
				setTimeout(() => {
					setCreateDModal(false);
				}, 1000);
			} else setCreateDdModal(true);
		}
	};

	const handleDeletePost = () => {
		//해당 글을 삭제하는 함수
		navigate("/community");
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
				<InfiniteScroll className="infinite-scroll" loader={<Loading />}>
					<TitleHeader
						title={
							post.title.length > 10
								? post.title.slice(0, 11) + "..."
								: post.title
						}
					/>
					<Btn
						background={theme.color.green}
						size="0.9rem"
						width="13rem"
						height="2rem"
						btnText={`카테고리 > ${category[post.categoryId]}`}
						onClick={() => navigate(`/community/${post.categoryId}`)}
					/>

					<div className="title">{post.title}</div>
					<div className="content">{post.content}</div>
					<WriterInfo writer={post.writer} date={post.date} />
				</InfiniteScroll>
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
				/>
				<div className="commentNum">댓글 {post.commentList.length}</div>
				{post.commentList.map((el) => (
					<div>
						<Comment comment={el.comment} writer={el.writer} date={el.date} />
					</div>
				))}
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
	margin-top: 6rem;
	margin-bottom: 6.5rem;

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

		height: 28.5rem;
		overflow: auto;
		border: 0.1rem solid #4d4d4d;
		border-radius: 0.8rem;
	}
	.btns {
		text-align: center;
	}

	.commentNum {
		font-weight: 600;
		line-height: 3rem;
	}
`;

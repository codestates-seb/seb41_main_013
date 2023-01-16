//글 상세 조회 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useParams } from "react-router-dom";

//components
import { TitleHeader } from "../components/Header";
import { Btn } from "../components/Button";
import { Comment } from "../components/Comment";
import { WriterInfo } from "../components/WriterInfo";
import { Input } from "../components/Input";

//dummy
import { CommunityList } from "../data/dummy";

export const PostDetail = () => {
	const { postId } = useParams();
	const category = ["우리 동네", "운동", "규칙적인 생활", "기타"];
	const post = CommunityList.filter((el) => el.postId == postId)[0];

	return (
		<>
			<PostDetailContainer>
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
					width="11rem"
					height="2rem"
					btnText={`카테고리 > ${category[post.categoryId]}`}
				/>
				<div className="title">{post.title}</div>
				<div className="content">{post.content}</div>
				<WriterInfo writer={post.writer} date={post.date} />
				<div className="btns">
					<Btn background={theme.color.green} btnText="수정" />
					<Btn
						background={theme.color.gray}
						btnText="삭제"
						color={theme.color.navy}
					/>
				</div>
				<Input
					lineHeight="4rem"
					placeholder="댓글을 입력해주세요"
					fontSize="1rem"
					cols="75"
				/>
				<div className="assign">
					<Btn background={theme.color.green} btnText="등록" />
				</div>
				<div className="commentNum">댓글 {post.commentList.length}</div>
				{post.commentList.map((el) => (
					<div>
						<Comment comment={el.comment} writer={el.writer} date={el.date} />
					</div>
				))}
			</PostDetailContainer>
		</>
	);
};

const PostDetailContainer = styled.div`
	font-family: "Inter";
	font-style: normal;
	width: 36.4rem;

	display: flex;
	flex-direction: column;
	* {
		margin-bottom: 1rem;
	}

	.title {
		font-weight: 600;
		font-size: 1.4rem;
		line-height: 3rem;
	}
	.content {
		white-space: pre-wrap;
		font-weight: 400;
		font-size: 1.3rem;
		line-height: 1.7rem;

		height: 28.5rem;
		overflow: auto;
		border: 0.1rem solid #4d4d4d;
		border-radius: 0.8rem;
	}
	.btns {
		text-align: center;
	}
	.assign {
	}
	.commentNum {
		font-weight: 600;
		line-height: 3rem;
	}
`;

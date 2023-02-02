import styled from "styled-components";
import { WriterInfo } from "./WriterInfo";
import theme from "./theme";
import { Link } from "react-router-dom";

export const formatDate = (value) => {
	//value는 받아온 데이터의 글/댓글 등의 작성 날짜
	const date = new Date();
	return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}; //날짜 형식으로 출력해주려고 만듦

//props : 글 제목, 글 내용, 아바타 이미지 주소, 작성자 이름, 작성 시각
export const PostSummary = (props) => {
	return (
		<>
			<PostSumContainer>
				<div>
					<Link to={`/post/${props.boardId}`}>
						<div className="title">{props.title}</div>
					</Link>
					<div className="content">{props.content}</div>
				</div>
				<WriterInfo
					imgURL={props.imgULR}
					writer={props.writer}
					date={formatDate(props.date)}
					margin="0 0 1rem 0"
					memberId={props.memberId}
				/>
			</PostSumContainer>
		</>
	);
};

const PostSumContainer = styled.div`
	width: 100%;
	height: 16rem;
	border-bottom: 1px solid ${theme.color.gray};

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	a {
		text-decoration: none;
	}

	div {
		font-family: "Inter";
		font-style: normal;

		.title {
			font-weight: 600;
			font-size: 1.4rem;
			color: black;
			line-height: 3rem;
			text-align: left;
			cursor: pointer;
		}
		.content {
			font-weight: 400;
			font-size: 1.2rem;
			line-height: 1.6rem;
			text-align: left;

			height: 9.8rem;
			overflow: hidden;
		}
	}
`;

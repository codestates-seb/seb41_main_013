import styled from "styled-components";
import WriterInfo from "./WriterInfo";
import theme from "./theme";

const PostSumContainer = styled.div`
	width: 36.1rem;
	height: 16rem;
	border-bottom: 1px solid ${theme.color.gray};

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	div {
		font-family: "Inter";
		font-style: normal;
		.title {
			font-weight: 600;
			font-size: 1.4rem;
			line-height: 3rem;
			text-align: left;
		}
		.content {
			font-weight: 400;
			font-size: 1.3rem;
			line-height: 1.6rem;
			text-align: left;
		}
	}
`;

//props : 글 제목, 글 내용
const PostSummary = ({ title, content }) => {
	return (
		<>
			<PostSumContainer>
				<div>
					<div className="title">{title || "title"}</div>
					<div className="content">{content || "content"}</div>
				</div>
				<WriterInfo />
			</PostSumContainer>
		</>
	);
};

export default PostSummary;

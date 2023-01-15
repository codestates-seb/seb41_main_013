import styled from "styled-components";
import WriterInfo from "./WriterInfo";
import theme from "./theme";

//props : 글 제목, 글 내용, 아바타 이미지 주소, 작성자 이름, 작성 시각
const PostSummary = (props) => {
	return (
		<>
			<PostSumContainer>
				<div>
					<div className="title">{props.title}</div>
					<div className="content">
						{props.content.length > 210
							? props.content.slice(0, 210) + "....."
							: props.content}
					</div>
				</div>
				<WriterInfo
					imgURL={props.imgULR}
					writer={props.writer}
					date={props.date}
				/>
			</PostSumContainer>
		</>
	);
};

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

export default PostSummary;

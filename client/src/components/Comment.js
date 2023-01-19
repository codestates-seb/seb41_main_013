import theme from "./theme";
import styled from "styled-components";
import { formatDate } from "./PostSummary";
import { useState } from "react";

//components
import { Btn } from "./Button";
import { WriterInfo } from "./WriterInfo";
import { WriteComment } from "./WriteComment";

//props : 댓글 내용
export const Comment = (props) => {
	const [update, setUpdate] = useState(false);

	return (
		<CommentContainer>
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
							onClick={() => setUpdate(true)}
						/>
						<Btn
							btnText={"삭제"}
							background={theme.color.gray}
							color={theme.color.navy}
							width={"4rem"}
							height={"2.5rem"}
							size={"1rem"}
						/>
					</div>
				)}
			</div>
			{update && <WriteComment comment={props.comment} />}
			<WriterInfo
				writer={props.writer}
				date={formatDate(props.date)}
				imgURL={props.imgURL}
			/>
		</CommentContainer>
	);
};

const CommentContainer = styled.div`
	width: 36.4rem;
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

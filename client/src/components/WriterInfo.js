import styled from "styled-components";
import Avatar from "./Avatar";
import { formatDate } from "./PostSummary";

//props : 유저 이름, 작성 시간, 유저 이미지 파일 경로
export const WriterInfo = (props) => {
	return (
		<>
			<WriterInfoContainer margin={props.margin}>
				<Avatar memberId={props.memberId} />
				<div>{props.writer}</div>
				<div>{formatDate(props.date)}</div>
			</WriterInfoContainer>
		</>
	);
};

const WriterInfoContainer = styled.div`
	width: 14rem;
	height: 3rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 0.9rem;
	line-height: 1rem;
	margin: ${(props) => props.margin || 0};
`;

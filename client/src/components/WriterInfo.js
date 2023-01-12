import styled from "styled-components";
import Avatar from "./Avatar";

//props : 유저 이름, 작성 시간, 유저 이미지 파일 경로
const WriterInfo = (props) => {
	return (
		<>
			<WriterInfoContainer>
				<Avatar imgURL={props.imgURL} />
				<div>{props.name}</div>
				<div>{props.date}</div>
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
	font-size: 0.8rem;
	line-height: 1rem;
`;

export default WriterInfo;

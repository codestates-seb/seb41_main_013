import styled from "styled-components";
import Avatar from "./Avatar";

const WriterInfoContainer = styled.div`
	width: 140px;
	height: 30px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 8px;
	line-height: 10px;
`;

const WriterInfo = ({ name, date }) => {
	return (
		<>
			<WriterInfoContainer>
				<Avatar />
				<div>{name || "name"}</div>
				<div>{date || "2023-01-11"}</div>
			</WriterInfoContainer>
		</>
	);
};

export default WriterInfo;

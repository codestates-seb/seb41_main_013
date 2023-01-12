import styled from "styled-components";
import Avatar from "./Avatar";

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

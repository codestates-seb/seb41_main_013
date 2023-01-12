import styled from "styled-components";
import { GrHomeRounded } from "react-icons/gr";
import { FaUsers, FaRegUserCircle } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import theme from "./theme";

export const Footer = () => {
	return (
		<FooterContainer>
			<BottomItem>
				<GrHomeRounded />
				<span>홈</span>
			</BottomItem>
			<BottomItem>
				<BsGraphUp />
				<span>마이챌린지</span>
			</BottomItem>
			<BottomItem>
				<FaUsers />
				<span>마이챌린지</span>
			</BottomItem>
			<BottomItem>
				<FaRegUserCircle />
				<span>마이챌린지</span>
			</BottomItem>
		</FooterContainer>
	);
};

const FooterContainer = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	height: 6.5rem;
	display: flex;
`;

const BottomItem = styled.button`
	background-color: ${theme.color.white};
	border: none;
	width: 9.1rem;
	height: 6.5rem;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	font-size: 1.8rem;

	span {
		font-size: 1rem;
	}
`;

import styled from "styled-components";
import { FaUsers, FaRegUserCircle } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import theme from "./theme";
import { NavLink } from "react-router-dom";

export const Footer = () => {
	return (
		<FooterContainer>
			<BottomItem to="/">
				<AiOutlineHome />
				<span>홈</span>
			</BottomItem>
			<BottomItem to="/mychallenge">
				<BsGraphUp />
				<span>마이챌린지</span>
			</BottomItem>
			<BottomItem to="/community">
				<FaUsers />
				<span>커뮤니티</span>
			</BottomItem>
			<BottomItem to="/mypage">
				<FaRegUserCircle />
				<span>마이페이지</span>
			</BottomItem>
		</FooterContainer>
	);
};

const FooterContainer = styled.div`
	/* border: 1px solid black; */
	width: 100%;
	/* max-width: 480px; */
	height: 6.5rem;
	display: flex;
	background-color: white;
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	margin: 0 auto;
	padding: 0 1.3rem;
`;

const BottomItem = styled(NavLink)`
	border: none;
	width: 25%;
	height: 6.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	font-size: 1.8rem;
	text-decoration: none;
	color: black;
	font-size: 2rem;

	&.active {
		color: ${theme.color.green};
	}
`;

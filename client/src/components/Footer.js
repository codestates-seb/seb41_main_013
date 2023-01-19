import styled from "styled-components";
import { FaUsers, FaRegUserCircle } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import theme from "./theme";
import { Link } from "react-router-dom";

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
	width: 36.4rem;
	height: 6.5rem;
	display: flex;
	position: fixed;
	bottom: 0;
	z-index: 9999;
	background-color: white;
`;

const BottomItem = styled(Link)`
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
	text-decoration: none;
	color: black;
	font-size: 2rem;
`;

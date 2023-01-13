import styled from "styled-components";
import { Btn } from "./Button";
import { ArrowLeft } from "./NavItem";
import theme from "./theme";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { MypageSetting } from "./MypageSetting";
import { Link } from "react-router-dom";

export const MainHeader = () => {
	return (
		<Main>
			<Link to="/">
				<Btn
					btnText="Logo"
					background={`${theme.color.green}`}
					color="black"
					width="10.5rem"
					height="3.2rem"
				/>
			</Link>
			<div>
				<Btn btnText="로그인" color="black" width="6rem" />
				<Btn btnText="회원가입" color="black" width="6rem" />
			</div>
		</Main>
	);
};

export const TitleHeader = (props) => {
	return (
		<Title>
			<ArrowLeft />
			{props.title}
			<div />
		</Title>
	);
};

export const MypageHeader = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const onClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Title>
				<div />
				{props.title}
				<IoSettingsOutline className="icon" onClick={onClick} />
			</Title>
			{isOpen ? <MypageSetting setIsOpen={setIsOpen} /> : null}
		</>
	);
};

const Main = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	height: 5.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	height: 5.2rem;
	font-size: 1.6rem;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.icon {
		font-size: 2rem;
	}
`;

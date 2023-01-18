import styled from "styled-components";
import { Btn } from "./Button";
import { ArrowLeft } from "./NavItem";
import theme from "./theme";
import { IoSettingsOutline } from "react-icons/io5";
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
				<Link to="/login">
					<Btn btnText="로그인" color="black" width="6rem" />
				</Link>
				<Link to="/signup">
					<Btn btnText="회원가입" color="black" width="6rem" />
				</Link>
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
	return (
		<>
			<Title>
				<div />
				{props.title}
				<IoSettingsOutline className="icon" onClick={props.onClick} />
			</Title>
		</>
	);
};

const Main = styled.div`
	/* border: 1px solid black; */
	width: 36.4rem;
	height: 5.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	z-index: 9999;
	background-color: white;
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

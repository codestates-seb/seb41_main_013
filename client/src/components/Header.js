import styled from "styled-components";
import { Btn } from "./Button";
import { ArrowLeft } from "./NavItem";
import theme from "./theme";

export const MainHeader = () => {
	return (
		<Main>
			<Btn
				btnText="Logo"
				background={`${theme.color.green}`}
				color="black"
				width="10.5rem"
				height="3.2rem"
			/>
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
`;

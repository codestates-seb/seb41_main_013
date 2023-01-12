import styled from "styled-components";
import { ArrowLeft } from "./NavItem";
import { Logo, Auth } from "./Button";

export const MainHeader = () => {
	return (
		<Main>
			<Logo>AppLogo</Logo>
			<div>
				<Auth>로그인</Auth>
				<Auth>회원가입</Auth>
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
	width: ${(props) => props.theme.width.content};
	height: ${(props) => props.theme.height.header};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.div`
	border: 1px solid black;
	width: ${(props) => props.theme.width.content};
	height: ${(props) => props.theme.height.header};
	font-size: ${(props) => props.theme.font.title};
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

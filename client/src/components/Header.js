import styled from "styled-components";
import { ArrowLeft } from "./NavItem";
import theme from "./theme";

export const MainHeader = () => {
	return (
		<Main>
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
	width: ${theme.width.content};
	height: ${theme.height.header};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.div`
	border: 1px solid black;
	width: ${theme.width.content};
	height: ${theme.height.header};
	font-size: ${theme.font.title};
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

import styled from "styled-components";
import theme from "./theme";

export const Logo = styled.button`
	width: 6.5rem;
	height: 2rem;
	padding: 0;
	background-color: ${theme.color.green};
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${theme.font.headerBtn};
`;

export const Auth = styled.button`
	height: 1rem;
	border: none;
	font-size: ${theme.font.headerBtn};
	background-color: ${props.theme.color.white};
`;

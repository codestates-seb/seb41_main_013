import styled from "styled-components";

export const Logo = styled.button`
	width: 6.5rem;
	height: 2rem;
	padding: 0;
	background-color: ${(props) => props.theme.color.green};
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${(props) => props.theme.font.headerBtn};
`;

export const Auth = styled.button`
	height: 1rem;
	border: none;
	font-size: ${(props) => props.theme.font.headerBtn};
	background-color: ${(props) => props.theme.color.white};
`;

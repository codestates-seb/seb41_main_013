import styled from "styled-components";

const StyledButton = styled.button`
	width: ${(props) => props.width || "48px"};
	height: 35px;
	border-radius: 12px;
	border: none;
	background-color: ${(props) => props.background || "white"};
	cursor: pointer;

	text-align: center;
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	color: ${(props) => props.color || "white"};
`;

const Button = ({ btnText, background, color, width }) => {
	return (
		<>
			<StyledButton background={background} width={width} color={color}>
				{btnText}
			</StyledButton>
		</>
	);
};

export default Button;

import styled from "styled-components";

const StyledButton = styled.button`
	width: ${(props) => props.width || "48px"};
	height: ${(props) => props.height || "35px"};
	border-radius: 12px;
	border: none;
	background-color: ${(props) => props.background || "white"};
	cursor: pointer;
	margin: 3px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.6);

	text-align: center;
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: ${(props) => props.size || "13px"};
	line-height: 16px;
	color: ${(props) => props.color || "white"};
`;

const Button = ({ btnText, size, background, color, width, height }) => {
	return (
		<>
			<StyledButton
				background={background}
				size={size}
				width={width}
				color={color}
				height={height}
			>
				{btnText}
			</StyledButton>
		</>
	);
};

export default Button;

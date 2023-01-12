import styled from "styled-components";

const StyledButton = styled.button`
	width: ${(props) => props.width || "4.8rem"};
	height: ${(props) => props.height || "3.5rem"};
	border-radius: 1.2rem;
	border: none;
	background-color: ${(props) => props.background || "white"};
	cursor: pointer;
	margin: 0.3rem;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.6);

	text-align: center;
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: ${(props) => props.size || "1.3rem"};
	line-height: 1.6rem;
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

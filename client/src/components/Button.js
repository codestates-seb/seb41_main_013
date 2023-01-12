import styled from "styled-components";

//props : 버튼 텍스트, 버튼 배경색, 버튼 글씨 색, 글씨 사이즈, 버튼 가로&세로 사이즈
const Button = ({ btnText, background, color, size, width, height }) => {
	return (
		<>
			<StyledButton
				background={background}
				color={color}
				size={size}
				width={width}
				height={height}
			>
				{btnText}
			</StyledButton>
		</>
	);
};

const StyledButton = styled.button`
	width: ${(props) => props.width || "4.8rem"};
	height: ${(props) => props.height || "3.5rem"};
	border-radius: 1.2rem;
	border: none;
	background-color: ${(props) => props.background || "white"};
	cursor: pointer;
	margin: 0.3rem;
	box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 0.6);

	text-align: center;
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: ${(props) => props.size || "1.3rem"};
	line-height: 1.6rem;
	color: ${(props) => props.color || "white"};
`;

export default Button;

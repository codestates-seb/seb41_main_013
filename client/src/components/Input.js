import styled from "styled-components";

export const Input = (props) => {
	return (
		<>
			<StyledLabel>{props.label}</StyledLabel>
			<StyledInput
				placeholder={props.placeholder}
				value={props.value}
				margin={props.margin}
				padding={props.padding}
				cols={props.cols || "51"}
				rows={props.rows || "1"}
				borderRadius={props.borderRadius}
				fontSize={props.fontSize}
				lineHeight={props.lineHeight}
			></StyledInput>
		</>
	);
};

export const InputAuth = (props) => {
	return (
		<Wrapper>
			{props.label}
			<AuthInput
				type={props.type}
				value={props.value}
				onChange={props.onChange}
			/>
		</Wrapper>
	);
};

const StyledInput = styled.textarea`
	border: 0.1rem solid #4d4d4d;
	margin: ${(props) => props.margin || "0"};
	padding: ${(props) => props.padding || "0"};
	border-radius: ${(props) => props.borderRadius || "0.8rem"};
	font-size: ${(props) => props.fontSize || "1.3rem"};
	font-family: "Inter";
	font-style: normal;
	line-height: ${(props) => props.lineHeight || "1.6rem"};
	resize: none;
`;

const StyledLabel = styled.div`
	font-size: ${(props) => props.fontSize || "1.4rem"};
	line-height: 3rem;
`;

const AuthInput = styled.input`
	width: ${(props) => props.width || "36rem"};
	border: 0.1rem solid #4d4d4d;
	height: 3rem;
	border-radius: 0.8rem;
	font-size: 1.4rem;
`;

const Wrapper = styled.div`
	font-size: ${(props) => props.fontSize || "1.4rem"};
	line-height: 3rem;
	display: flex;
	flex-direction: column;
	width: 36.4rem;
`;

import styled from "styled-components";
import React from "react";

export const Input = React.forwardRef((props, ref) => {
	return (
		<>
			<StyledLabel>{props.label}</StyledLabel>
			<StyledInput
				placeholder={props.placeholder}
				value={props.value}
				margin={props.margin}
				padding={props.padding}
				rows={props.rows || "1"}
				borderRadius={props.borderRadius}
				fontSize={props.fontSize}
				lineHeight={props.lineHeight}
				onChange={props.onChange}
				borderColor={props.borderColor}
				{...props.register}
			></StyledInput>
		</>
	);
});

export const InputAuth = (props) => {
	return (
		<Wrapper>
			<span>{props.label}</span>

			<AuthInput
				type={props.type}
				value={props.value}
				onChange={props.onChange}
				error={props.error}
				id={props.id}
			/>
			<p>{props.errmsg}</p>
		</Wrapper>
	);
};

const StyledInput = styled.textarea`
	border: 0.1rem solid ${(props) => props.borderColor || "#4d4d4d"};
	margin: ${(props) => props.margin || "0"};
	padding: ${(props) => props.padding || "0.6rem"};
	border-radius: ${(props) => props.borderRadius || "0.8rem"};
	font-size: ${(props) => props.fontSize || "1.3rem"};
	font-family: "Inter";
	font-style: normal;
	line-height: ${(props) => props.lineHeight || "1.6rem"};
	resize: none;
	width: 100%;
`;

const StyledLabel = styled.div`
	font-size: ${(props) => props.fontSize || "1.4rem"};
	line-height: 3rem;
`;

const AuthInput = styled.input`
	width: ${(props) => props.width || "34rem"};
	//border: 0.1rem solid #4d4d4d;
	height: 3rem;
	border-radius: 0.8rem;
	font-size: 1.4rem;
	padding-left: 1rem;
	border: ${(props) =>
		`0.1rem solid ${props.error ? props.theme.color.red : "#4d4d4d"}`};
`;

const Wrapper = styled.div`
	line-height: 3rem;
	display: flex;
	flex-direction: column;
	width: 36.4rem;
	span {
		padding-left: 2rem;
		font-size: ${(props) => props.fontSize || "1.3rem"};
	}
`;

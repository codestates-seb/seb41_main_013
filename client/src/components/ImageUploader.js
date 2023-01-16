// todo: 이미지 미리보기 기능
import React, { useState } from "react";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";

export const ImageUploader = (props) => {
	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	return (
		<Label width={props.width} height={props.height}>
			<Input type="file" onChange={handleImageChange} />
			<StyledFaCamera width={props.width} height={props.height} />
		</Label>
	);
};

const Input = styled.input`
	display: none;
`;

const Label = styled.label`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.1rem solid #4d4d4d;
	border-radius: 0.8rem;
	width: ${(props) => props.width || "10rem"};
	height: ${(props) => props.height || "10rem"};
`;

const StyledFaCamera = styled(FaCamera)`
	width: ${(props) => props.width || "3rem"};
	height: ${(props) => props.height || "3rem"};
	color: #4d4d4d;
`;

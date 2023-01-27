import React, { useState } from "react";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";

export const ImageUploader = React.forwardRef((props, ref) => {
	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
		props.onImageChange(e.target.files[0]);
	};

	return (
		<ImageUploaderWrapper
			width={props.width}
			height={props.height}
			borderColor={props.borderColor}
		>
			<Input type="file" onChange={handleImageChange} {...props.register} />
			{image ? (
				<StyledImg src={URL.createObjectURL(image)} alt={image.name} />
			) : (
				<StyledFaCamera width={props.iconWidth} height={props.iconHeight} />
			)}
		</ImageUploaderWrapper>
	);
});

const Input = styled.input`
	display: none;
`;

const ImageUploaderWrapper = styled.label`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.1rem solid ${(props) => props.borderColor || "#4d4d4d"};
	border-radius: 0.8rem;
	width: ${(props) => props.width || "10rem"};
	height: ${(props) => props.height || "10rem"};
`;

const StyledImg = styled.img`
	width: 80%;
	height: 80%;
	object-fit: cover;
`;

const StyledFaCamera = styled(FaCamera)`
	width: ${(props) => props.iconWidth || "3rem"};
	height: ${(props) => props.iconHeight || "3rem"};
	color: #4d4d4d;
`;

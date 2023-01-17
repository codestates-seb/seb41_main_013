import React, { useState } from "react";
import styled from "styled-components";
import { FaCamera } from "react-icons/fa";

export const ImageUploader = (props) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <ImageUploaderWrapper
      width={props.width}
      height={props.height}
    >
      <Input type="file" onChange={handleImageChange} />
      {image ? 
        <StyledImg src={URL.createObjectURL(image)} alt="" />
        :
        <StyledFaCamera
          width={props.iconWidth}
          height={props.iconHeight}
        />
      }
    </ImageUploaderWrapper>
  );
};

const Input = styled.input`
  display: none;
`;

const ImageUploaderWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid #4d4d4d;
  border-radius: 0.8rem;
  width: ${props => props.width || "10rem"};
  height: ${props => props.height || "10rem"};
`;

const StyledImg = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
`;

const StyledFaCamera = styled(FaCamera)`
  width: ${props => props.iconWidth || "3rem"};
  height: ${props => props.iconHeight || "3rem"};
  color: #4D4D4D;
`;
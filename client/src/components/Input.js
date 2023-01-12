import styled from "styled-components";

export const Input = (props) => {
  return (
    <>
      <StyledLabel>
        {props.label}
      </StyledLabel>
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
  )
};

const StyledInput = styled.textarea`
  border: 0.1rem solid #4d4d4d;
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  border-radius: ${props => props.borderRadius || "0.8rem"};
  font-size: ${props => props.fontSize || "1.3rem"};
  line-height: ${props => props.lineHeight || "1.6rem"};
  resize: none;
`;

const StyledLabel = styled.div`
  font-size: ${props => props.fontSize || "1.4rem"};
  line-height: 3rem;
`;
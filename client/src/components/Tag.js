import styled from "styled-components";
import theme from "./theme";

export const InfoTag = (props) => {
  return (
    <StyledInfoTag
      width={props.width}
      height={props.height}
    >{props.label}
    </StyledInfoTag>
  )
};

export const CategoryTag = (props) => {
  return (
    <StyledCategoryTag
      width={props.width}
      height={props.height}
    >카테고리 {">"} {props.category}
    </StyledCategoryTag>
  )
};

const StyledInfoTag = styled.div`
  background-color: ${theme.color.gray};
  padding: 0 0.5rem;
  width: ${props => props.width};
  height: ${props => props.height || "1.6rem"};
  border-radius: 0.3rem;
  color: #4D4D4D;
  font-size: 0.8rem;
  text-align: center;
  line-height: ${props => props.height || "1.6rem"};
`;

const StyledCategoryTag = styled.div`
  background-color: ${theme.color.green};
  width: ${props => props.width || "9.9rem"};
  height: ${props => props.height || "2rem"};
  border-radius: 1.2rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: ${props => props.height || "2rem"};
`;
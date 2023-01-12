import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import theme from "./theme";

export const BackToTopBtn = (props) => {
  const [showBtn, setShowBtn] = useState(false);

  const btnShow = () => {
    const scrolled = window.scrollY;
    scrolled > 300 ? setShowBtn(true) : setShowBtn(false);
  };

  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  };

  window.addEventListener("scroll", btnShow);

  return (
    <StyledBtn
      onClick={handleClick}
      bottom={props.bottom}
      right="1.3rem"
    >
      <FaArrowUp />
    </StyledBtn>
  )
};

export const CreateBtn = (props) => {
  return (
    <Link to={props.NavTo}>
      <StyledBtn
        backgroundColor="#F6C324"
        left="1.3rem"
      >
        <FaPlus />
      </StyledBtn>
    </Link>
  )
};

export const DeleteBtn = (props) => {
  return (
    <StyledBtn
      backgroundColor="#FB5E0E"
      width="1.4rem"
      height="1.4rem"
      right={props.right}
      bottom={props.bottom}
    >
      <IoClose />
    </StyledBtn>
  )
}

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor || theme.color.navy};
  border: ${props => props.border || "none"};
  border-radius: ${props => props.borderRadius || "5rem"};
  cursor: pointer;
  width: ${props => props.width || "3.5rem"};
  height: ${props => props.height || "3.5rem"};
  color: ${props => props.color || "#fff"};
  font-size: ${props => props.fontSize || "1.5rem"};
  position: fixed;
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom || "7.5rem"};
`; 
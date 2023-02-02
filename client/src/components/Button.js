import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import theme from "./theme";

export const Btn = (props) => {
	return (
		<>
			<StyledBasicBtn
				background={props.background}
				color={props.color}
				size={props.size}
				width={props.width}
				height={props.height}
				margin={props.margin}
				type={props.type}
				onClick={props.onClick}
				value={props.value}
				fontWeight={props.fontWeight}
				fontFamily={props.fontFamily}
				cursor={props.cursor}
			>
				{props.btnText}
			</StyledBasicBtn>
		</>
	);
};

export const BackToTopBtn = (props) => {
	const [showBtn, setShowBtn] = useState(false);

	const btnShow = () => {
		const scrolled = window.scrollY;
		scrolled > 100 ? setShowBtn(true) : setShowBtn(false);
	};

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", btnShow);

	return (
		<>
			{showBtn && (
				<StyledBtn onClick={handleClick} bottom={props.bottom} right="1.3rem">
					<FaArrowUp />
				</StyledBtn>
			)}
		</>
	);
};

export const CreateBtn = (props) => {
	return (
		<Link to={props.NavTo}>
			<StyledBtn
				backgroundColor="#F6C324"
				left="1.3rem"
				onClick={props.onClick}
			>
				<FaPlus />
			</StyledBtn>
		</Link>
	);
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
	);
};

const StyledBasicBtn = styled.button`
	box-sizing: border-box;
	width: ${(props) => props.width || "4.8rem"};
	height: ${(props) => props.height || "3.6rem"};
	border-radius: 1.2rem;
	border: none;
	background-color: ${(props) => props.background || "white"};
	cursor: ${(props) => props.cursor || "pointer"};
	margin: ${(props) => props.margin || "0.3rem"};
	/* box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 0.6); */

	text-align: center;
	font-family: ${(props) => props.fontFamily || "Inter"};
	font-style: normal;
	font-weight: ${(props) => props.fontWeight || "400"};
	font-size: ${(props) => props.size || "1.3rem"};
	line-height: 1.9rem;
	color: ${(props) => props.color || "white"};
`;

const StyledBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.backgroundColor || theme.color.navy};
	border: ${(props) => props.border || "none"};
	border-radius: ${(props) => props.borderRadius || "5rem"};
	cursor: pointer;
	width: ${(props) => props.width || "3.5rem"};
	height: ${(props) => props.height || "3.5rem"};
	color: ${(props) => props.color || "#fff"};
	font-size: ${(props) => props.fontSize || "1.5rem"};
	position: fixed;
	left: ${(props) => props.left};
	right: ${(props) => props.right};
	bottom: ${(props) => props.bottom || "7.5rem"};
`;

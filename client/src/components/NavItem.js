import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export const NavTitle = (props) => {
	return (
		<Navbar width={props.width}>
			{props.title}
			<ArrowBoxRight to={props.link} onClick={props.onClick}>
				<IoIosArrowForward />
			</ArrowBoxRight>
		</Navbar>
	);
};

export const ArrowLeft = () => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<ArrowBoxLeft onClick={handleGoBack}>
			<IoIosArrowBack />
		</ArrowBoxLeft>
	);
};

const Navbar = styled.div`
	/* border: 1px solid black; */
	width: ${(props) => props.width || "36.4rem"};
	height: 4.7rem;
	font-size: 1.4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ArrowBoxLeft = styled.div`
	width: 3rem;
	height: 3rem;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const ArrowBoxRight = styled(Link)`
	width: 3rem;
	height: 3rem;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: black;
`;

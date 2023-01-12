import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export const NavTitle = (props) => {
	return (
		<Navbar>
			{props.title}
			<ArrowBoxRight>
				<IoIosArrowForward />
			</ArrowBoxRight>
		</Navbar>
	);
};

export const ArrowLeft = () => {
	return (
		<ArrowBoxLeft>
			<IoIosArrowBack />
		</ArrowBoxLeft>
	);
};

const Navbar = styled.div`
	border: 1px solid black;
	width: 36.4rem;
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
`;

const ArrowBoxRight = styled.div`
	width: 3rem;
	height: 3rem;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

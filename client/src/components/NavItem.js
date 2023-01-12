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
	width: ${(props) => props.theme.width.content};
	height: 3.25rem;
	font-size: ${(props) => props.theme.font.title};
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ArrowBoxLeft = styled.div`
	width: ${(props) => props.theme.width.icon};
	height: ${(props) => props.theme.height.icon};
	font-size: ${(props) => props.theme.font.icon};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ArrowBoxRight = styled.div`
	width: ${(props) => props.theme.width.icon};
	height: ${(props) => props.theme.height.icon};
	font-size: ${(props) => props.theme.font.icon};
	display: flex;
	justify-content: center;
	align-items: center;
`;

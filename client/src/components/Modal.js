import styled, { ThemeProvider } from "styled-components";
import Button from "./Button";
import theme from "./theme";

const ModalContainer = styled.div`
	width: 30rem;
	height: 20rem;
	background: white;
	border-radius: 1.2rem;
	box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
	padding: 10px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 1.5rem;
	line-height: 1.8rem;
	color: black;
	text-align: center;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const ButtonGroup = styled.div`
	display: flex;
`;

// Modal
export const Modal = ({ modalText }) => {
	return (
		<>
			<ModalContainer>{modalText}</ModalContainer>
		</>
	);
};

// OneBtnModal
export const OneBtnModal = ({ modalText, btnText }) => {
	return (
		<ThemeProvider theme={theme}>
			<ModalContainer>
				{modalText}
				<Button btnText={btnText} background={theme.color.orange} />
			</ModalContainer>
		</ThemeProvider>
	);
};

// TwoBtnModal
export const TwoBtnModal = ({ modalText, btnTextOrg, btnTextGry }) => {
	return (
		<ThemeProvider theme={theme}>
			<ModalContainer>
				{modalText}
				<ButtonGroup>
					<Button btnText={btnTextOrg} background={theme.color.orange} />
					<Button
						btnText={btnTextGry}
						background={theme.color.gray}
						color={theme.color.navy}
					/>
				</ButtonGroup>
			</ModalContainer>
		</ThemeProvider>
	);
};

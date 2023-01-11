import styled from "styled-components";
import Button from "./atoms/Button";
import theme from "../settings/theme";
import { ThemeProvider } from "styled-components";

const ModalContainer = styled.div`
	width: 300px;
	height: 200px;
	background: white;
	border-radius: 12px;
	box-shadow: 5px 5px 5px 5px gray;
	padding: 10px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 18px;
	color: black;
	text-align: center;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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

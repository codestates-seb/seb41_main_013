import styled, { ThemeProvider } from "styled-components";
import { Btn } from "./Button";
import theme from "./theme";

// Modal
//props : 모달 텍스트
export const Modal = (props) => {
	return (
		<>
			<ModalContainer>{props.modalText}</ModalContainer>
		</>
	);
};

// OneBtnModal
//props : 모달 텍스트, 주황색 버튼 텍스트
export const OneBtnModal = (props) => {
	return (
		<ThemeProvider theme={theme}>
			<ModalContainer>
				{props.modalText}
				<Btn btnText={props.btnText} background={theme.color.orange} />
			</ModalContainer>
		</ThemeProvider>
	);
};

// TwoBtnModal
//props : 모달 텍스트, 주황색 버튼 텍스트, 회색 버튼 텍스트
export const TwoBtnModal = (props) => {
	return (
		<ThemeProvider theme={theme}>
			<ModalContainer>
				{props.modalText}
				<ButtonGroup>
					<Btn btnText={props.btnTextOrg} background={theme.color.orange} />
					<Btn
						btnText={props.btnTextGry}
						background={theme.color.gray}
						color={theme.color.navy}
					/>
				</ButtonGroup>
			</ModalContainer>
		</ThemeProvider>
	);
};

export const Modaltest = () => {
	return (
		<Wrapper>
			<TwoBtnModal modalText="삭제하시겠습니까?"></TwoBtnModal>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	display: none;
`;

const ModalContainer = styled.div`
	width: 30rem;
	height: 20rem;
	background: white;
	border-radius: 1.2rem;
	box-shadow: 0 0.4rem 0.5rem rgba(0, 0, 0, 0.6);
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
	gap: 2rem;
`;

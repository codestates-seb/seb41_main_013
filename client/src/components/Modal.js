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
				<Btn
					btnText={props.btnText}
					background={theme.color.orange}
					onClick={props.onClick}
				/>
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
				<BtnGroup>
					<Btn
						btnText={props.btnTextOrg}
						background={theme.color.orange}
						onClick={props.onClickOrg}
						type={props.typeOrg}
					/>
					<Btn
						btnText={props.btnTextGry}
						background={theme.color.gray}
						color={theme.color.navy}
						onClick={props.onClickGry}
					/>
				</BtnGroup>
			</ModalContainer>
		</ThemeProvider>
	);
};

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
	position: fixed;
	z-index: 999;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const BtnGroup = styled.div`
	display: flex;
	gap: 2rem;
`;

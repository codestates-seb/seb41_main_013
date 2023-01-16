import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import { Modal } from "../components/Modal";
import theme from "../components/theme";

export const Signup = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");

	const [nameErr, setNameErr] = useState(false);
	const [emailErr, setEmailErr] = useState(false);
	const [passwordErr, setPasswordErr] = useState(false);
	const [passwordCheckErr, setPasswordCheckErr] = useState(false);

	const [openModal, setOpenModal] = useState(false);
	// const [sameEmailModal, setSameEmailModal] = useState(false);

	const onChangeName = (e) => {
		setName(e.target.value);
	};

	const nameValidCheck = () => {
		const nameRegex = /^[a-zA-Z가-힣0-9]{3,}$/;
		if (!name || !nameRegex.test(name)) {
			setNameErr(true);
			return false;
		} else {
			setNameErr(false);
			return true;
		}
	};

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const emailValidCheck = () => {
		const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!email || !emailRegexp.test(email)) {
			setEmailErr(true);
			return false;
		} else {
			setEmailErr(false);
			return true;
		}
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const passwordValidCheck = () => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
		if (!password || !passwordRegex.test(password)) {
			setPasswordErr(true);
			return false;
		} else {
			setPasswordErr(false);
			return true;
		}
	};

	const onChangePasswordCheck = (e) => {
		setPasswordCheck(e.target.value);
	};

	const passwordSameCheck = () => {
		if (password !== passwordCheck || passwordCheck.length === 0) {
			setPasswordCheckErr(true);
			return false;
		}
		setPasswordCheckErr(false);
		return true;
	};

	const checkValidation = () => {
		if (
			nameValidCheck() &&
			emailValidCheck() &&
			passwordValidCheck() &&
			passwordSameCheck()
		) {
			return true;
		}
		return false;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("name :", name);
		console.log("email :", email);
		console.log("password :", password);
		console.log("passwordCheck :", passwordCheck);

		if (checkValidation()) {
			console.log("회원가입 성공");
			setOpenModal(true);
			setTimeout(() => {
				setOpenModal(false);
				navigate("/login");
			}, 1500);
		} else {
			console.log("회원가입 실패");
			setName("");
			setEmail("");
			setPassword("");
			setPasswordCheck("");
		}
	};

	return (
		<Wrapper onSubmit={onSubmit}>
			{openModal && (
				<Modal modalText="회원가입 성공! 로그인 페이지로 이동합니다." />
			)}
			<div />
			<div>
				<InputAuth
					label="이름"
					type="text"
					value={name}
					onChange={onChangeName}
				/>
				{nameErr && <p>특수문자 없이 3글자 이상 입력해주세요.</p>}
			</div>
			<div>
				<InputAuth
					label="이메일"
					type="email"
					value={email}
					onChange={onChangeEmail}
				/>
				{emailErr && <p>이메일 형식에 맞지 않습니다.</p>}
			</div>
			<div>
				<InputAuth
					label="비밀번호"
					type="password"
					value={password}
					onChange={onChangePassword}
				/>
				{passwordErr && (
					<p>비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.</p>
				)}
			</div>
			<div>
				<InputAuth
					label="비밀번호 확인"
					type="password"
					value={passwordCheck}
					onChange={onChangePasswordCheck}
				/>
				{passwordCheckErr && <p>비밀번호가 일치하지 않습니다.</p>}
			</div>
			<Btn
				btnText="확인"
				background={theme.color.green}
				width="34rem"
				type="submit"
			/>
		</Wrapper>
	);
};

const Wrapper = styled.form`
	border: 1px solid black;
	width: 36.4rem;
	height: 79.2rem;
	display: flex;
	flex-direction: column;
	gap: 4rem;

	p {
		color: ${theme.color.red};
	}
`;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import { Modal } from "../components/Modal";
import theme from "../components/theme";

export const SignUp = () => {
	const navigate = useNavigate();

	const [userInput, setUserInput] = useState({
		name: "",
		email: "",
		password: "",
		passwordCheck: "",
	});

	const [inputErr, setInputErr] = useState({
		name: false,
		email: false,
		password: false,
		passwordCheck: false,
		overLap: false, // 이메일 중복
	});

	const [isOpenModal, setIsOpenModal] = useState(false);

	const onChangeName = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, name: e.target.value };
		});
		setInputErr((prevState) => {
			return { ...prevState, name: false };
		});
	};

	const nameValidCheck = () => {
		const nameRegex = /^[a-zA-Z가-힣0-9]{3,}$/;
		if (!userInput.name || !nameRegex.test(userInput.name)) {
			setInputErr((prevState) => {
				return { ...prevState, name: true };
			});
			return false;
		}
		return true;
	};

	const onChangeEmail = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, email: e.target.value };
		});
		setInputErr((prevState) => {
			return { ...prevState, name: false };
		});
	};

	const emailValidCheck = () => {
		const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!userInput.email || !emailRegexp.test(userInput.email)) {
			setInputErr((prevState) => {
				return { ...prevState, email: true };
			});
			return false;
		}
		return true;
	};

	const onChangePassword = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, password: e.target.value };
		});
		setInputErr((prevState) => {
			return { ...prevState, password: false };
		});
	};

	const passwordValidCheck = () => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
		if (!userInput.password || !passwordRegex.test(userInput.password)) {
			setInputErr((prevState) => {
				return { ...prevState, password: true };
			});
			return false;
		}
		return true;
	};

	const onChangePasswordCheck = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, passwordCheck: e.target.value };
		});
		setInputErr((prevState) => {
			return { ...prevState, passwordCheck: false };
		});
	};

	const passwordSameCheck = () => {
		if (
			userInput.password !== userInput.passwordCheck ||
			!userInput.passwordCheck
		) {
			setInputErr((prevState) => {
				return { ...prevState, passwordCheck: true };
			});
			return false;
		}
		return true;
	};

	// 이메일 중복 확인하는 함수

	const checkValidation = () => {
		nameValidCheck();
		emailValidCheck();
		passwordValidCheck();
		passwordSameCheck();
		if (
			nameValidCheck() &&
			emailValidCheck() &&
			passwordValidCheck() &&
			passwordSameCheck()
		) {
			console.log("checkValidation true");
			return true;
		}
		console.log("checkValidation false");
		return false;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("name :", userInput.name);
		console.log("email :", userInput.email);
		console.log("password :", userInput.password);
		console.log("passwordCheck :", userInput.passwordCheck);

		if (checkValidation()) {
			console.log("회원가입 성공");
			setIsOpenModal(true);
			setTimeout(() => {
				setIsOpenModal(false);
				navigate("/login");
			}, 1500);
		} else {
			console.log("회원가입 실패");
		}
	};

	return (
		<Wrapper onSubmit={onSubmit}>
			{isOpenModal && (
				<Modal modalText="회원가입 성공! 로그인 페이지로 이동합니다." />
			)}
			<div>
				<InputAuth
					label="이름"
					type="text"
					value={userInput.name}
					onChange={onChangeName}
					border={inputErr.name && `${theme.color.red}`}
					fontSize="1.5rem"
				/>
				{inputErr.name && <p>특수문자 없이 3글자 이상 입력해주세요.</p>}
			</div>

			<div>
				<InputAuth
					label="이메일"
					type="email"
					value={userInput.email}
					onChange={onChangeEmail}
					border={inputErr.email && `${theme.color.red}`}
				/>
				{inputErr.email && <p>올바른 이메일 형식으로 입력해주세요.</p>}
			</div>
			<div>
				<InputAuth
					label="비밀번호"
					type="password"
					value={userInput.password}
					onChange={onChangePassword}
					border={inputErr.password && `${theme.color.red}`}
				/>
				{inputErr.password && (
					<p>
						비밀번호는 영문, 숫자, 특수기호를 포함한 8자 이상으로 입력해주세요.
					</p>
				)}
			</div>
			<div>
				<InputAuth
					label="비밀번호 확인"
					type="password"
					value={userInput.passwordCheck}
					onChange={onChangePasswordCheck}
					border={inputErr.passwordCheck && `${theme.color.red}`}
				/>
				{inputErr.passwordCheck && <p>비밀번호가 일치하지 않습니다.</p>}
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
	/* border: 1px solid black; */
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 3rem;

	input {
		margin: 0 auto;
	}

	p {
		color: ${theme.color.red};
		padding-left: 2rem;
		margin-top: 0.5rem;
	}
`;

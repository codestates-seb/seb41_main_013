import styled from "styled-components";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import theme from "../components/theme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignIn = () => {
	const [userInput, setUserInput] = useState({
		email: "",
		password: "",
	});

	const [inputErr, setInputErr] = useState({
		email: false,
		passowrd: false,
		signIn: false, // 로그인 에러 => 아이디 또는 비밀번호를 확인하세요.
	});

	const navigate = useNavigate();

	const onChangeEmail = (e) => {
		setUserInput((prevState) => {
			return { ...prevState, email: e.target.value };
		});
		setInputErr((prevState) => {
			return { ...prevState, email: false };
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

	const validCheck = () => {
		emailValidCheck();
		passwordValidCheck();
		if (emailValidCheck() && passwordValidCheck()) {
			console.log("true");
			return true;
		}
		console.log("fail");
		return false;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (validCheck()) {
			// 로그인 요청 보내기
			console.log("로그인 성공! 홈으로 이동");
			navigate("/");
		} else {
			console.log("로그인 실패!");
			setInputErr((prevState) => {
				return { ...prevState, signIn: true };
			});
		}
	};

	return (
		<Wrapper onSubmit={onSubmit}>
			<div>
				<InputAuth
					label="이메일"
					type="email"
					value={userInput.email}
					onChange={onChangeEmail}
					border={inputErr.emailErr && `${theme.color.red}`}
				/>
				{inputErr.emailErr && <p>올바른 이메일 형식으로 입력해주세요.</p>}
			</div>
			<div>
				<InputAuth
					label="비밀번호"
					type="password"
					value={userInput.password}
					onChange={onChangePassword}
					border={inputErr.passwordErr && `${theme.color.red}`}
				/>
				{inputErr.passwordErr && (
					<p>
						비밀번호는 영문, 숫자, 특수기호를 포함한 8자 이상으로 입력해주세요.
					</p>
				)}
			</div>
			<div>
				<Btn
					btnText="로그인"
					background={theme.color.green}
					width="34rem"
					type="submit"
				></Btn>
				{/* {loginErr && <p>이메일 또는 비밀번호를 확인하세요.</p>} */}
			</div>
			<FindPw to="/findPw">비밀번호 찾기</FindPw>
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
	gap: 4rem;

	input {
		margin: 0 auto;
	}

	p {
		padding-left: 2rem;
		margin-top: 0.5rem;
		color: ${theme.color.red};
	}
`;

const FindPw = styled(Link)`
	text-decoration: none;
	color: #3b94d9;
	font-size: 1.1rem;
`;

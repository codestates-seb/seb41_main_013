import styled from "styled-components";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import theme from "../components/theme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailErr, setEmailErr] = useState(false);
	const [passwordErr, setPasswordErr] = useState(false);
	const [loginErr, setLoginErr] = useState(false);

	const navigate = useNavigate();

	// 존재하지 않는 이메일 혹은 잘못된 비밀번호 (로그인 실패) => 아이디 또는 비밀번호를 확인하세요
	// 로그인 버튼 누르면 로딩중인거 표시 (이메일 조회해야 해서 그런가)

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
		setEmailErr(false);
	};

	const emailCheck = () => {
		const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!email || !emailRegexp.test(email)) {
			setEmailErr(true);
			return false;
		}
		setEmailErr(false);
		return true;
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
		setPasswordErr(false);
	};

	const passwordCheck = () => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
		if (!password || !passwordRegex.test(password)) {
			setPasswordErr(true);
			return false;
		}
		setPasswordErr(false);
		return true;
	};

	const validCheck = () => {
		emailCheck();
		passwordCheck();
		if (emailCheck() && passwordCheck()) {
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
			setLoginErr(true);
		}
	};

	return (
		<Wrapper onSubmit={onSubmit}>
			<div />
			<div>
				<InputAuth
					label="이메일"
					type="email"
					value={email}
					onChange={onChangeEmail}
					border={emailErr && `${theme.color.red}`}
				/>
				{emailErr && <p>올바른 이메일 형식으로 입력해주세요.</p>}
			</div>
			<div>
				<InputAuth
					label="비밀번호"
					type="password"
					value={password}
					onChange={onChangePassword}
					border={passwordErr && `${theme.color.red}`}
				/>
				{passwordErr && (
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
	border: 1px solid black;
	width: 36.4rem;
	height: 79.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
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

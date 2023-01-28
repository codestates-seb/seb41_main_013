import styled from "styled-components";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import theme from "../components/theme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getLoginUser, signin } from "../redux/userSlice";
import { postAuth } from "../apis/base";
import axios from "axios";

export const SignIn = () => {
	const [userInput, setUserInput] = useState({
		email: "",
		password: "",
	});

	const [inputErr, setInputErr] = useState({
		email: false,
		password: false,
		signIn: false,
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const { value, id } = e.target;
		// console.log(`${id} : ${value}`);

		setUserInput((prev) => ({
			...prev,
			[id]: value,
		}));

		setInputErr((prev) => ({
			...prev,
			[id]: false,
		}));
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
			return true;
		}
		return false;
	};

	const login = async () => {
		try {
			const body = userInput;
			// console.log(body);
			const data = await postAuth(body);
			console.log(data);
			dispatch(
				getLoginUser({
					memberId: data.data,
				}),
			);
			localStorage.setItem("authorization", data.headers.authorization);
			// localStorage.setItem("expiredTime", expires); // 만료시간 저장
			// axios.defaults.headers.common[
			// 	"Authorization"
			// ] = `Bearer ${data.headers.authorization}`;
			dispatch(signin());
			navigate("/");
		} catch (e) {
			console.log(e);
			setInputErr((prev) => ({
				...prev,
				signIn: true,
			}));
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const isValid = validCheck();
		if (!isValid) {
			console.log("fail");
			return;
		}

		login();
	};

	return (
		<Wrapper onSubmit={onSubmit}>
			<div>
				<InputAuth
					label="이메일"
					type="email"
					value={userInput.email}
					onChange={handleInputChange}
					id="email"
					error={inputErr.email}
					errmsg={inputErr.email && "올바른 이메일 형식으로 입력해주세요."}
				/>
			</div>
			<div>
				<InputAuth
					label="비밀번호"
					type="password"
					value={userInput.password}
					onChange={handleInputChange}
					id="password"
					error={inputErr.password}
					errmsg={
						inputErr.password &&
						"비밀번호는 영문, 숫자, 특수기호를 포함한 8자 이상으로 입력해주세요."
					}
				/>
				{inputErr.signIn && <p>이메일 또는 비밀번호를 확인하세요.</p>}
			</div>
			<div>
				<Btn
					btnText="로그인"
					background={theme.color.green}
					width="34rem"
					type="submit"
				></Btn>
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postMembers } from "../apis/base";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import { Modal } from "../components/Modal";
import theme from "../components/theme";

export const SignUp = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const navigate = useNavigate();

	const [userInput, setUserInput] = useState({
		name: "",
		email: "",
		password: "",
		passwordCheck: "",
	});

	const [inputErr, setInputErr] = useState({
		name: true,
		email: false,
		password: false,
		passwordCheck: false,
		overLap: false,
	});

	const handleInputChange = (e) => {
		const { value, id } = e.target;
		console.log(`${id} : ${value}`);

		setUserInput((prev) => ({
			...prev,
			[id]: value,
		}));

		setInputErr((prev) => ({
			...prev,
			[id]: false,
		}));
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
			return true;
		}
		return false;
	};

	// const onSubmit = (e) => {
	// 	e.preventDefault();

	// 	// const body = {
	// 	// 	email: userInput.email,
	// 	// 	name: userInput.name,
	// 	// 	password: userInput.password,
	// 	// };
	// 	const {passwordCheck, ...body} = userInput

	// 	if (checkValidation()) {
	// 		axios
	// 			.post("https://d276-121-129-154-70.jp.ngrok.io/api/members", body)
	// 			.then((res) => {
	// 				console.log(res);
	// 				setIsOpenModal(true);
	// 				setTimeout(() => {
	// 					setIsOpenModal(false);
	// 					navigate("/login");
	// 				}, 1500);
	// 			})
	// 			.catch((AxiosError) => {
	// 				setInputErr((prevState) => {
	// 					return { ...prevState, overLap: true };
	// 				});
	// 			});
	// 	} else {
	// 		console.log("회원가입 실패");
	// 	}
	// };

	const register = async () => {
		try {
			const { passwordCheck, ...body } = userInput;

			const { data } = await postMembers(body);
			console.log(data);
			setIsOpenModal(true);
			setTimeout(() => {
				setIsOpenModal(false);
				navigate("/login");
			}); // 진짜 앵간하면 사용하면 안됨 => js event or task queue
		} catch (e) {
			setInputErr((prev) => ({
				...prev,
				overLap: true,
			}));
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const isValid = checkValidation();
		if (!isValid) {
			console.log("Fail");
			return;
		}

		register();
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
					onChange={handleInputChange}
					error={inputErr.name}
					fontSize="1.5rem"
					id="name"
				/>
				{inputErr.name && <p>특수문자 없이 3글자 이상 입력해주세요.</p>}
			</div>

			<div>
				<InputAuth
					label="이메일"
					type="email"
					value={userInput.email}
					onChange={handleInputChange}
					error={inputErr.email}
					id="email"
				/>
				{inputErr.email && <p>올바른 이메일 형식으로 입력해주세요.</p>}
				{inputErr.overLap && <p>중복되는 이메일이 존재합니다.</p>}
			</div>
			<div>
				<InputAuth
					label="비밀번호"
					type="password"
					value={userInput.password}
					onChange={handleInputChange}
					error={inputErr.password}
					id="password"
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
					onChange={handleInputChange}
					error={inputErr.passwordCheck}
					id="passwordCheck"
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

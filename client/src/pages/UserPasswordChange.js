import { MainHeader } from "../components/Header";
import styled from "styled-components";
import { InputAuth } from "../components/Input";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useSelector } from "react-redux";
import axios from "axios";

export const UserPasswordChange = () => {
	const [userInput, setUserInput] = useState({
		newPassword: "",
		passwordCheck: "",
	});

	const [inputErr, setInputErr] = useState({
		newPwErr: false,
		newPwCheckErr: false,
	});

	const [saveModal, setSaveModal] = useState(false);

	const { memberId, accessToken, name, profileImageId } = useSelector(
		(state) => state.loginUserInfo.loginUserInfo,
	);

	const handleInputChange = (e) => {
		const { value, id } = e.target;

		setUserInput((prev) => ({
			...prev,
			[id]: value,
		}));

		setInputErr((prev) => ({
			...prev,
			[id]: false,
		}));
	};

	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	// 새로운 비밀번호 유효성 검사
	const newPasswordCheck = () => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
		if (!userInput.newPassword || !passwordRegex.test(userInput.newPassword)) {
			setInputErr((prev) => {
				return { ...prev, newPwErr: true };
			});
			return false;
		}
		return true;
	};

	// 새로운 비밀번호 확인하는 칸이 비어있거나, 새로운 비밀번호와 일치하지 않을 때
	const newPasswordSameCheck = () => {
		if (
			!userInput.passwordCheck ||
			userInput.newPassword !== userInput.passwordCheck
		) {
			setInputErr((prev) => {
				return { ...prev, newPwCheckErr: true };
			});
			return false;
		}
		return true;
	};

	const editPwValidCheck = () => {
		// passwordCheck();
		newPasswordCheck();
		newPasswordSameCheck();
		// currentAndNewPwCheck();
		if (
			// passwordCheck() &&
			newPasswordCheck() &&
			newPasswordSameCheck()
			// currentAndNewPwCheck()
		) {
			return true;
		} else {
			return false;
		}
	};

	const editPassword = async () => {
		try {
			const body = {
				// id: memberId,
				// name: "하하하",
				password: userInput.newPassword,
				profileImageId: profileImageId,
			};
			console.log(body);
			const response = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/members/${memberId}`,
				body,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			console.log(response);
			// setSaveModal(true);
			// setTimeout(() => {
			// 	navigate("/");
			// }, 1000);
		} catch (e) {
			console.log(e);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (!editPwValidCheck()) {
			console.log("fail");
			return;
		}

		editPassword();
	};

	return (
		<>
			<MainHeader />
			<Content onSubmit={onSubmit}>
				{saveModal && (
					<Modal modalText="비밀번호 변경 완료! 다시 로그인해주세요!" />
				)}
				<div />
				<div>
					<InputAuth
						type="password"
						label="새로운 비밀번호"
						value={userInput.newPassword}
						onChange={handleInputChange}
						id="newPassword"
						error={inputErr.newPwErr}
						errmsg={
							inputErr.newPwErr &&
							"영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
						}
					/>
					{inputErr.sameErr && (
						<p>현재 비밀번호와 똑같이 설정할 수 없습니다.</p>
					)}
				</div>
				<div>
					<InputAuth
						type="password"
						label="비밀번호 확인"
						value={userInput.passwordCheck}
						onChange={handleInputChange}
						id="passwordCheck"
						error={inputErr.newPwCheckErr}
						errmsg={inputErr.newPwCheckErr && "비밀번호가 일치하지 않습니다."}
					/>
				</div>
				<div className="btn">
					<Btn type="submit" btnText="저장" background={theme.color.green} />
					<Btn
						btnText="취소"
						background={theme.color.gray}
						color={theme.color.navy}
						onClick={handleBack}
					/>
				</div>
			</Content>
		</>
	);
};

const Content = styled.form`
	/* border: 1px solid black; */
	/* width: 100%; */
	/* height: 79.2rem; */
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 7rem;

	input {
		margin: 0 auto;
	}

	p {
		color: ${theme.color.red};
		padding-left: 2rem;
		margin-top: 0.5rem;
	}

	.btn {
		margin: 0 auto;
		display: flex;
		gap: 2rem;
	}
`;

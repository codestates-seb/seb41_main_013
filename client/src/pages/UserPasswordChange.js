import { MainHeader } from "../components/Header";
import styled from "styled-components";
import { InputAuth } from "../components/Input";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

export const UserPasswordChange = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	const [password, setPassword] = useState("");
	const [newpassword, setnewPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");

	const [currentPwErr, setCurrentPwErr] = useState(false);
	const [newPwErr, setNewPwErr] = useState(false);
	const [newPwCheckErr, setNewPwCheckErr] = useState(false);

	// 현재 비밀번호와 새로운 비밀번호 같은지 확인
	const [sameErr, setSameErr] = useState(false);

	const [saveModal, setSaveModal] = useState(false);

	const onChangePw = (e) => {
		setPassword(e.target.value);
		setCurrentPwErr(false);
	};

	const editPasswordCheck = () => {
		if (!password) {
			setCurrentPwErr(true);
			return false;
		}
		setCurrentPwErr(false);
		return true;
	};

	const onChangeNewPw = (e) => {
		setnewPassword(e.target.value);
		setNewPwErr(false);
	};

	const editNewPasswordCheck = () => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
		if (!newpassword || !passwordRegex.test(newpassword)) {
			setNewPwErr(true);
			return false;
		}
		setNewPwErr(false);
		return true;
	};

	const onChangeNewPwCheck = (e) => {
		setPasswordCheck(e.target.value);
		setNewPwCheckErr(false);
	};

	const editNewPasswordSameCheck = () => {
		// 비밀번호칸 비어있거나 새로운 비밀번호와 일치하지 않을 때
		if (!passwordCheck || newpassword !== passwordCheck) {
			setNewPwCheckErr(true);
			return false;
		}
		return true;
	};

	// 현재 비밀번호와 새로운 비밀번호가 일치하는지 확인하는 함수
	const currentAndNewPwCheck = () => {
		if (password === newpassword) {
			setSameErr(true);
			return false;
		}
		return true;
	};

	const editPwValidCheck = () => {
		editPasswordCheck();
		editNewPasswordCheck();
		editNewPasswordSameCheck();
		currentAndNewPwCheck();
		if (
			editPasswordCheck() &&
			editNewPasswordCheck() &&
			editNewPasswordSameCheck() &&
			currentAndNewPwCheck()
		) {
			console.log("통과");
			return true;
		} else {
			console.log("실패");
			return false;
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (editPwValidCheck()) {
			console.log("validcheck pass");
			setSaveModal(true);
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} else {
			console.log("validcheck fail");
		}
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
						label="현재 비밀번호"
						value={password}
						onChange={onChangePw}
						border={currentPwErr && `${theme.color.red}`}
					/>
					{currentPwErr && <p>비밀번호를 정확하게 입력해주세요.</p>}
				</div>
				<div>
					<InputAuth
						type="password"
						label="새로운 비밀번호"
						value={newpassword}
						onChange={onChangeNewPw}
						border={(newPwErr || sameErr) && `${theme.color.red}`}
					/>
					{newPwErr && <p>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</p>}
					{sameErr && <p>현재 비밀번호와 똑같이 설정할 수 없습니다.</p>}
				</div>
				<div>
					<InputAuth
						type="password"
						label="비밀번호 확인"
						value={passwordCheck}
						onChange={onChangeNewPwCheck}
						border={newPwCheckErr && `${theme.color.red}`}
					/>
					{newPwCheckErr && <p>비밀번호가 일치하지 않습니다.</p>}
				</div>
				<div className="btn">
					<Btn
						type="submit"
						btnText="저장"
						background={`${theme.color.green}`}
					/>
					<Btn
						btnText="취소"
						background={`${theme.color.gray}`}
						color={`${theme.color.navy}`}
						onClick={handleBack}
					/>
				</div>
			</Content>
		</>
	);
};

const Content = styled.form`
	border: 1px solid black;
	width: 100%;
	height: 79.2rem;
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

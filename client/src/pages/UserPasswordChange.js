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

	const [sameErr, setSameErr] = useState(false);
	const [pwErr, setPwErr] = useState(false);
	const [pwCheckErr, setPwCheckErr] = useState(false);

	const [saveModal, setSaveModal] = useState(false);

	const onChangePw = (e) => {
		setPassword(e.target.value);
	};

	const onChangeNewPw = (e) => {
		setnewPassword(e.target.value);
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
		if (!newpassword || !passwordRegex.test(newpassword)) {
			setPwErr(true);
			return false;
		} else {
			setPwErr(false);
			return true;
		}
	};

	const onChangePwCheck = (e) => {
		setPasswordCheck(e.target.value);
	};

	const pwCheck = () => {
		if (password === newpassword) {
			setSameErr(true);
			return false;
		}
		return true;
	};

	const newPwCheck = () => {
		if (newpassword !== passwordCheck) {
			setPwCheckErr(true);
			return false;
		}
		return true;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// console.log("password :", password);
		// console.log("newpassword :", newpassword);
		// console.log("passwordCheck :", passwordCheck);
		if (pwCheck() && newPwCheck()) {
			setSaveModal(true);
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	};

	return (
		<>
			<MainHeader />
			{saveModal && (
				<Modal modalText="비밀번호 변경 완료! 다시 로그인해주세요!" />
			)}
			<Content onSubmit={onSubmit}>
				<div />
				<div>
					<InputAuth
						type="password"
						label="현재 비밀번호"
						value={password}
						onChange={onChangePw}
					/>
				</div>
				<div>
					<InputAuth
						type="password"
						label="새로운 비밀번호"
						value={newpassword}
						onChange={onChangeNewPw}
					/>
					{pwErr && <p>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</p>}
					{sameErr && <p>현재 비밀번호와 똑같이 설정할 수 없습니다.</p>}
				</div>
				<div>
					<InputAuth
						type="password"
						label="비밀번호 확인"
						value={passwordCheck}
						onChange={onChangePwCheck}
					/>
					{pwCheckErr && <p>비밀번호가 일치하지 않습니다.</p>}
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
	height: 79.2rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 7rem;

	p {
		color: ${theme.color.red};
	}

	.btn {
		margin: 0 auto;
		display: flex;
		gap: 2rem;
	}
`;

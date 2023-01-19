import { useState } from "react";
import styled from "styled-components";
import { Btn } from "../components/Button";
import { InputAuth } from "../components/Input";
import theme from "../components/theme";

export const FindPassword = () => {
	// 등록된 이메일인지 확인
	const [emailInfoErr, setEmailInfoErr] = useState(false);
	const [emailErr, setEmailErr] = useState(false);
	const [findEmail, setFIndEmail] = useState("");

	const onChangeFindEmail = (e) => {
		setFIndEmail(e.target.value);
		setEmailErr(false);
	};

	const emptyEmailCheck = () => {
		const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!findEmail || !emailRegexp.test(findEmail)) {
			setEmailErr(true);
			return false;
		}
		setEmailErr(false);
		return true;
	};

	const onClickToFindEmail = () => {
		emptyEmailCheck();
	};

	return (
		<Wrapper>
			<div>
				<p>비밀번호 찾기에 이용할 이메일을 작성해주세요.</p>
				<p>작성된 이메일로 임시 비밀번호가 전송됩니다.</p>
			</div>
			<div>
				<InputAuth
					type="email"
					value={findEmail}
					onChange={onChangeFindEmail}
					border={(emailInfoErr || emailErr) && `${theme.color.red}`}
				/>
				{emailInfoErr && <span>등록되지 않은 이메일입니다.</span>}
				{emailErr && <span>올바른 이메일 형식으로 입력해주세요.</span>}
			</div>
			<Btn
				btnText="완료"
				background={theme.color.green}
				width="34rem"
				onClick={onClickToFindEmail}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	height: 79.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;

	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	p {
		font-size: 1.3rem;
		margin-top: 1rem;
	}

	span {
		color: ${theme.color.red};
		padding-left: 2rem;
		margin-top: 0.5rem;
	}

	input {
		margin: 0 auto;
	}
`;

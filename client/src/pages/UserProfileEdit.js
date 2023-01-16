import { MainHeader } from "../components/Header";
import styled from "styled-components";
import { ImageUploader } from "../components/ImageUploader";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { useNavigate } from "react-router-dom";
import { InputAuth } from "../components/Input";
import { useState } from "react";
import { Modal } from "../components/Modal";

export const UserProfileEdit = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [nameErr, setNameErr] = useState(false);

	const [saveModal, setSaveModal] = useState(false);

	const onChangeName = (e) => {
		setName(e.target.value);
		console.log(name);
	};

	const CheckName = () => {
		if (!name) {
			setNameErr(true);
			return false;
		}
		return true;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (CheckName()) {
			setSaveModal(true);
			setTimeout(() => {
				navigate("/mypage");
			}, 1000);
		} else {
			return;
		}
	};

	const handleBack = () => {
		navigate(-1);
	};
	return (
		<>
			<MainHeader />
			{saveModal && <Modal modalText="수정 완료!" />}
			<Container onSubmit={onSubmit}>
				<div />
				<ImageUploader />
				<div>
					<InputAuth
						type="text"
						label="변경할 이름"
						value={name}
						onChange={onChangeName}
					/>
					{nameErr && <p>변경할 이름을 등록해주세요.</p>}
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
			</Container>
		</>
	);
};

const Container = styled.form`
	width: 36.4rem;
	height: 79.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 10rem;

	.btn {
		margin: 0 auto;
		display: flex;
		gap: 2rem;
	}

	p {
		color: ${theme.color.red};
	}
`;

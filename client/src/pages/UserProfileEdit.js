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
		setNameErr(false);
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
				console.log("변경 성공");
				navigate("/mypage");
			}, 1000);
		} else {
			console.log("변경 실패");
		}
	};

	const handleBack = () => {
		navigate(-1);
	};
	return (
		<>
			<MainHeader />
			<Container onSubmit={onSubmit}>
				{saveModal && <Modal modalText="수정 완료!" />}
				<div />
				<ImageUploader />
				<div>
					<InputAuth
						type="text"
						label="변경할 이름"
						value={name}
						onChange={onChangeName}
						border={nameErr && `${theme.color.red}`}
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
	/* border: 1px solid black; */
	width: 100%;
	/* height: 79.2rem; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 10rem;

	input {
		margin: 0 auto;
	}

	.btn {
		margin: 0 auto;
		display: flex;
		gap: 2rem;
	}

	p {
		color: ${theme.color.red};
		padding-left: 1.5rem;
		margin-top: 0.5rem;
	}
`;

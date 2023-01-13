import { MainHeader } from "../components/Header";
import styled from "styled-components";
import { ImageUploader } from "../components/ImageUploader";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { useNavigate } from "react-router-dom";
import { InputAuth } from "../components/Input";
import { useState } from "react";

export const UserProfileEdit = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [nameErr, setNameErr] = useState(false);

	const onChangeName = (e) => {
		setName(e.target.value);
		console.log(name);
	};

	const CheckName = () => {
		if (!name) {
			setNameErr(true);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		CheckName();
	};

	const handleBack = () => {
		navigate(-1);
	};
	return (
		<Wrapper>
			<MainHeader />
			<Container onSubmit={onSubmit}>
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
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid black;
	width: 39rem;
	height: 84.4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 7rem;
`;

const Container = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 7rem;

	.btn {
		margin: 0 auto;
		display: flex;
		gap: 2rem;
	}

	p {
		color: ${theme.color.red};
	}
`;

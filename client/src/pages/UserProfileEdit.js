import { MainHeader } from "../components/Header";
import styled from "styled-components";
import { ImageUploader } from "../components/ImageUploader";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { useNavigate } from "react-router-dom";
import { InputAuth } from "../components/Input";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getLoginUser } from "../redux/userSlice";

export const UserProfileEdit = () => {
	const [userInput, setUserInput] = useState({
		name: "",
		newPassword: "",
		passwordCheck: "",
	});
	const [inputErr, setInputErr] = useState({
		nameErr: false,
		newPwErr: false,
		newPwCheckErr: false,
	});
	const [saveModal, setSaveModal] = useState(false);
	const [image, setImage] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};

	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);
	const accessToken = localStorage.getItem("authorization");

	const onImageChange = (data) => {
		setImage(data);
		console.log(image);
		imgUpload();
	};

	const imgUpload = async () => {
		const frm = new FormData();
		frm.append("img", image);
		console.log(frm);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/api/upload`,
				frm,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

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
	const CheckName = () => {
		if (!userInput.name) {
			setInputErr((prev) => {
				return { ...prev, name: true };
			});
			return false;
		}
		return true;
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

	const editProfileValid = () => {
		CheckName();
		newPasswordCheck();
		newPasswordSameCheck();

		if (CheckName() && newPasswordCheck() && newPasswordSameCheck()) {
			return true;
		} else {
			return false;
		}
	};

	const patchMembers = async () => {
		try {
			const body = {
				id: loginUserInfo.memberId,
				name: userInput.name,
				password: userInput.newPassword,
				profileImageId: loginUserInfo.profileImageId,
			};
			console.log(body);
			const response = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/members/${loginUserInfo.memberId}`,
				body,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			console.log("response.data :", response.data);

			dispatch(
				getLoginUser({
					...loginUserInfo,
					id: response.data.id,
					name: response.data.name,
					profileImageId: response.data.profileImageId,
				}),
			);
			// console.log("loginUserInfo :", loginUserInfo);
			setSaveModal(true);
			setTimeout(() => {
				setSaveModal(false);
				navigate("/mypage");
			}, 1000);
		} catch (e) {
			console.log(e);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (!editProfileValid()) {
			console.log("fail");
			return;
		}

		patchMembers();
	};

	return (
		<>
			<MainHeader />
			<Container onSubmit={onSubmit}>
				{saveModal && <Modal modalText="프로필 수정 완료!!" />}
				<div />
				<ImageUploader
					width="20rem"
					height="20rem"
					onImageChange={onImageChange}
				/>
				<div>
					<InputAuth
						type="text"
						label="변경할 이름"
						value={userInput.name}
						onChange={handleInputChange}
						id="name"
						error={inputErr.name}
						errmsg={inputErr.name && "변경할 이름을 등록해주세요."}
					/>
				</div>
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
	/* border: 1px solid red; */
	width: 100%;
	/* height: 100vh; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	margin-top: 5.2rem;
	gap: 3rem;

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

// todo: imageUploader component에서 image 전역상태관리? 상태 끌어올리기?
import styled from "styled-components";
import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Btn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { OneBtnModal, TwoBtnModal } from "../components/Modal";
import theme from "../components/theme";

const MyChallengeUpload = () => {
	const [twoBtnModalVisible, setTwoBtnModalVisible] = useState(false);
	const [oneBtnModalVisible, setOneBtnModalVisible] = useState(false);
	const navigate = useNavigate();

	const handleBtnClick = () => {
		const currentTime = new Date();
		const hour = currentTime.getHours();
		const minute = currentTime.getMinutes();
		if (hour === 8 && minute >= 30 && hour === 9 && minute < 40) {
			setTwoBtnModalVisible(true);
		} else {
			setOneBtnModalVisible(true);
		}
	};

	const handleOrgClick = async () => {
		// try {
		//   // image post
		//   const image = "";
		//   const response = await axios.post("", image);
		//   if (response.status === 200) {
		//     navigate(`/mychallenge/1/others`);
		//   }
		// } catch (error) {
		//   console.error(error);
		// }
	};

	const handleConfirmClick = () => {
		navigate("/mychallenge");
	};

	return (
		<MyChallengeUploadWrapper>
			<TitleHeader title="" />
			<ImageUploader width="30rem" height="30rem" />
			<Btn
				background={theme.color.green}
				width="100%"
				height="4.8rem"
				// fontWeight="700"
				size="1.4rem"
				btnText="등록하기"
				onClick={handleBtnClick}
			/>
			{twoBtnModalVisible && (
				<TwoBtnModal
					modalText="등록하시겠습니까?"
					btnTextOrg="확인"
					btnTextGry="취소"
					onClickOrg={() => handleOrgClick()}
					onClickGry={() => setTwoBtnModalVisible(false)}
				/>
			)}
			{oneBtnModalVisible && (
				<OneBtnModal
					modalText="인증 가능한 시간이 아닙니다."
					btnText="확인"
					onClick={() => handleConfirmClick()}
				/>
			)}
		</MyChallengeUploadWrapper>
	);
};

const MyChallengeUploadWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 1.3rem;
`;

export default MyChallengeUpload;

import styled from "styled-components";
import { Btn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { OneBtnModal, TwoBtnModal } from "../components/Modal";
import theme from "../components/theme";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const MyChallengeUpload = () => {
	const [challengeData, setChallengeData] = useState([]);
	const [twoBtnModalVisible, setTwoBtnModalVisible] = useState(false);
	const [oneBtnModalVisible, setOneBtnModalVisible] = useState(false);
	const [image, setImage] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();
	const challengeId = location.pathname.split("/")[2];
	const { memberId } = useSelector(
		(state) => state.loginUserInfo.loginUserInfo,
	);
	const accessToken = localStorage.getItem("authorization");

	useEffect(() => {
		getChallengeData();
	}, []);

	const getChallengeData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/details/${challengeId}`,
			);
			setChallengeData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleBtnClick = () => {
		const currentTime = dayjs();

		const startDate = dayjs(challengeData.startAt);
		const endDate = dayjs(challengeData.endAt);
		const startTime = dayjs(challengeData.snapshotStartAt, "HH:mm");
		const endTime = dayjs(challengeData.snapshotEndAt, "HH:mm");

		if ((currentTime.isAfter(startDate) || currentTime.isSame(startDate)) && (currentTime.isBefore(endDate) || currentTime.isSame(endDate)) && currentTime.isBetween(startTime, endTime)) {
			setTwoBtnModalVisible(true);
		} else {
			setOneBtnModalVisible(true);
		}
	};

	const handleOrgClick = async () => {
		const formData = new FormData();
		formData.append("file", image);

		try {
			const presignedUrlResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${accessToken}`,
					}
				});

			if (presignedUrlResponse.status === 200) {
				const uploadResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/snapshots`, {
					challengeId,
					memberId,
					snapshotImageId: presignedUrlResponse.data.imageId
				}, 
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					}
				});
				if (uploadResponse.status === 201) {
					navigate(`/mychallenge/${challengeId}/others`);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<MyChallengeUploadContainer>
			<TitleHeader
				title={challengeData.title}
			/>
			<MyChallengeUploadWrapper>
				<ImageUploader
					width="80%"
					height="50%"
					onImageChange={(img) => setImage(img)}
				/>
				<Btn
					background={theme.color.green}
					width="100%"
					height="4.8rem"
					fontWeight="700"
					size="1.4rem"
					margin="0"
					btnText="등록하기"
					onClick={image && handleBtnClick}
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
						onClick={() => navigate("/mychallenge")}
					/>
				)}
			</MyChallengeUploadWrapper>
		</MyChallengeUploadContainer>
	);
};

const MyChallengeUploadContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 1.3rem;
`;

const MyChallengeUploadWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 1.3rem;
	gap: 20%;
`;

export default MyChallengeUpload;

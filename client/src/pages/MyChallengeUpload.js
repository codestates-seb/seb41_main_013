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

const MyChallengeUpload = () => {
<<<<<<< HEAD
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
=======
  const [challengeData, setChallengeData] = useState(null);
  const [twoBtnModalVisible, setTwoBtnModalVisible] = useState(false);
  const [oneBtnModalVisible, setOneBtnModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const challengeId = location.pathname.split("/")[2];

  useEffect(() => {
    getChallengeData();
  }, []);

  const getChallengeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/challenges/details/${challengeId}`);
      setChallengeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnClick = () => {
    const currentTime = dayjs();
    const startTime = dayjs(challengeData.snapshotStartAt, "HH:mm:ss");
    const endTime = dayjs(challengeData.snapshotEndAt, "HH:mm:ss");

    if (currentTime.isBetween(startTime, endTime)) {
      setTwoBtnModalVisible(true);
    } else {
      setOneBtnModalVisible(true);
    }
  };

  const handleOrgClick = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      const snapshotImageId = response.data.snapshotImageId;
      const response2 = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/snapshots`, {
        challengeId,
        // memberId,
        snapshotImageId
      });
      if (response2.status === 200) {
        navigate(`/mychallenge/${challengeId}/others`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MyChallengeUploadContainer>
      <TitleHeader
          // title={challengeData.title}
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
        {twoBtnModalVisible && <TwoBtnModal
          modalText="등록하시겠습니까?"
          btnTextOrg="확인"
          btnTextGry="취소"
          onClickOrg={() => handleOrgClick()}
          onClickGry={() => setTwoBtnModalVisible(false)}
        />}
        {oneBtnModalVisible && <OneBtnModal
          modalText="인증 가능한 시간이 아닙니다."
          btnText="확인"
          onClick={() => navigate("/mychallenge")}
        />}
      </MyChallengeUploadWrapper>
    </MyChallengeUploadContainer>
  );
>>>>>>> dev
};

const MyChallengeUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MyChallengeUploadWrapper = styled.div`
<<<<<<< HEAD
	display: flex;
	flex-direction: column;
	height: 100vh;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 1.3rem;
=======
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1.3rem;
  gap: 20%;
>>>>>>> dev
`;

export default MyChallengeUpload;

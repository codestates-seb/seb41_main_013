import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import theme from "../components/theme";
import { Btn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { InfoTag } from "../components/Tag";
import { TwoBtnModal } from "../components/Modal";
import { FaRegBookmark, FaBookmark, FaShareAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ChallengeDetail = () => {
  const [twoBtnModalVisible, setTwoBtnModalVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [challengeData, setChallengeData] = useState([]);
  
  const location = useLocation();
	const challengeId = location.pathname.split("/")[3];
  
  const { memberId } = useSelector(
		(state) => state.loginUserInfo.loginUserInfo,
	);
  const isLogin = useSelector((state) => state.loginStatus.status);
  
  useEffect(() => {
    getChallengeData();
  }, []);

  const getChallengeData = async () => {
    try {
      const url = isLogin ? `${process.env.REACT_APP_SERVER_URL}/api/challenges/details/${challengeId}?memberId=${memberId}` : `${process.env.REACT_APP_SERVER_URL}/api/challenges/details/${challengeId}`;
      const response = await axios.get(url,
        {
					withCredentials: true,
				});
      setChallengeData(response.data);
      if (response.data.checkChallenging === "참여중") { setBtnVisible(true); }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnClick = () => {
    setTwoBtnModalVisible(true);
  };

  const handleOrgClick = async () => { 
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/challengers`, {
        challengeId,
        memberId
      }, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setBtnVisible(true);
        setTwoBtnModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChallengeDetailContainer>
      <TitleHeader 
        title={challengeData.title}
      />
      <ChallengeDetailWrapper>
        <StyledImg src={challengeData.challengeImageUrl} alt={challengeData.title} />
        <StyledH1>{challengeData.title}</StyledH1>
        <InfoTag
          label={`${challengeData.challengerCount}명`}
          width="4.5rem"
        />
        <SeparateLine></SeparateLine>
        <StyledUl>
          <li>기간<div>{challengeData.startAt} - {challengeData.endAt}</div></li>
          <li>빈도<div>{challengeData.frequency}</div></li>
          <li>인증시간<div>{challengeData.snapshotStartAt} - {challengeData.snapshotEndAt}</div></li>
        </StyledUl>
        <SeparateLine></SeparateLine>
        <StyledP>{challengeData.content}</StyledP>
      </ChallengeDetailWrapper>
      <ChallengeDetailFooter>
        <IconWrapper>
          <FaRegBookmark className="icon" />
          <FaShareAlt className="icon" />
        </IconWrapper>
        {!btnVisible && <Btn
          background={!isLogin ? theme.color.gray : theme.color.green}
          size="1.4rem"
          width="18.5rem"
          height="4.8rem"
          btnText="참여하기"
          margin="0"
          fontWeight="700"
          onClick={isLogin && handleBtnClick}
          cursor={isLogin ? "pointer" : "default"}
        />}
        {btnVisible && <Btn
          background={theme.color.gray}
          color={theme.color.navy}
          size="1.4rem"
          fontWeight="700"
          width="18.5rem"
          height="4.8rem"
          btnText="참여중"
          margin="0"
          cursor="default"
        />}
      </ChallengeDetailFooter>
      {twoBtnModalVisible && <TwoBtnModal 
        modalText="참여하시겠습니까?"
        btnTextOrg="확인"
        btnTextGry="취소"
        onClickOrg={() => handleOrgClick()}
        onClickGry={() => setTwoBtnModalVisible(false)}
      />}  
    </ChallengeDetailContainer>
  );
};

const StyledImg = styled.img`
  height: 21.4rem;
  border-radius: 0.8rem;
  margin: 1.3rem 0;
  object-fit: cover;
`;

const ChallengeDetailContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 1.3rem;
  margin-bottom: 6.5rem;
`;

const ChallengeDetailWrapper = styled.div`
  margin-top: 5.2rem;
  display: flex;
  flex-direction: column;
`;

const ChallengeDetailFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1.3rem;
  padding: 0 1.3rem;
`;

const StyledH1 = styled.h1`
  font-weight: 600;
  font-size: 1.4rem;
  padding-bottom: 0.6rem;
`;

const SeparateLine = styled.div`
  background-color: ${theme.color.gray};
  width: 100%;
  height: 0.2rem;
  margin: 0.6rem 0;
`;

const StyledUl = styled.div`
  & > li {
    font-size: 1.3rem;
    font-weight: 500;

    & > div {
      font-size: 1.3rem;
      font-weight: 400;
      margin-left: 1.6rem;
      margin-top: 0.6rem;
      margin-bottom: 0.6rem;
    }
  }
`;

const StyledP = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  padding-left: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 1rem;

  & .icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`;

export default ChallengeDetail;
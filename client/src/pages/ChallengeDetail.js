import styled from "styled-components";
import theme from "../components/theme";
import { Btn } from "../components/Button";
import { TitleHeader } from "../components/Header";
import { InfoTag } from "../components/Tag";
import dummyimage from "../assets/images/dummyimage.JPG";
import { TwoBtnModal } from "../components/Modal";
import { FaRegBookmark, FaBookmark, FaShareAlt } from "react-icons/fa";

const ChallengeDetail = () => {
  return (
    <>
      <TitleHeader 
        title="제목"
      />
      <StyledImg src={dummyimage} alt="" />
      <StyledH1>제목</StyledH1>
      <InfoTag
        label="299명"
        width="4.5rem"
      />
      <SeparateLine></SeparateLine>
      <StyledUl>
        <li>기간<div>10.30.월 - 11.2.목</div></li>
        <li>빈도<div>주 3일</div></li>
        <li>인증시간<div>00:00 - 23:59</div></li>
      </StyledUl>
      <SeparateLine></SeparateLine>
      <StyledP>챌린지에 대한 설명입니다.</StyledP>
      <ChallengeDetailFooter>
        <IconWrapper>
          <FaRegBookmark className="icon" />
          <FaShareAlt className="icon" />
        </IconWrapper>
        <Btn
          background={theme.color.green}
          size="1.4rem"
          width="18.5rem"
          height="4.8rem"
          btnText="참여하기"
          margin="0"
          // fontWeight
        />
        {/* <Btn
          background={theme.color.gray}
          color={theme.color.navy}
          size="1.4rem"
          // fontWeight="700"
          width="18.5rem"
          height="4.8rem"
          btnText="참여중"
          margin="0"
        /> */}
      </ChallengeDetailFooter>
        {/* <TwoBtnModal 
          modalText="참여하시겠습니까?"
          btnTextOrg="확인"
          btnTextGry="취소"
        /> */}
    </>
  );
};

const StyledImg = styled.img`
  width: 100%;
  height: 21.4rem;
  border-radius: 0.8rem;
  margin: 1.3rem 0;
  object-fit: cover;
`;

const ChallengeDetailFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 93%;
  position: fixed;
  bottom: 1.3rem;
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
  margin-left: 1rem;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
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
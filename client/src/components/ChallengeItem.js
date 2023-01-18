import styled from "styled-components";
import { Link } from "react-router-dom";
import { InfoTag } from "./Tag";
import { ProgressBar } from "./ProgressBar";
import dummyimage from "../assets/images/dummyimage.JPG";
import { Btn } from "./Button";
import theme from "./theme";

export const HomeChallengeItem = (props) => {
  return (
    <HomeChallengeItemWrapper>
      <img src={dummyimage} alt={props.challengeTitle} />
      <ChallengeTitle>{props.challengeTitle}</ChallengeTitle>
      <TagWrapper>
        <InfoTag label={props.challengerNum} />
        <InfoTag label={props.challengeFrequency} />
        <InfoTag label={props.challengeDate} />
      </TagWrapper>
    </HomeChallengeItemWrapper>
  )
};

export const MyChallengeItem = (props) => {
  return (
    <MyChallengeItemWrapper>
      <img 
        src={dummyimage}
        // src={props.challengeImg}
        alt={props.challengeTitle}
      />
      <MyChallengeItemInfo>
        <ChallengeTitle>{props.challengeTitle}</ChallengeTitle>
        <TagWrapper>
          <InfoTag label={props.challengerNum} />
          <InfoTag label={props.challengeFrequency} />
          <InfoTag label={props.challengeDate} />
          <InfoTag label={props.challengeTime} />
        </TagWrapper>
        <ProgressBar
          progress={props.progress}
          label={props.label}
        />
        <Btn
          background={theme.color.green}
          // width="20.2rem"
          width="19.9rem"
          btnText="인증하기"
        />
      </MyChallengeItemInfo>
    </MyChallengeItemWrapper>
  )
};

const HomeChallengeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.3rem;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  width: 18.2rem;

  & > img {
    width: 15.6rem;
    height: 10.2rem;
    border-radius: 0.8rem;
    margin-bottom: 0.6rem;
  }
`;

const ChallengeTitle = styled.div`
  font-size: 1.4rem;
  padding-bottom: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const MyChallengeItemWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 2.5rem;
  width: 36.4rem;

  & > img {
    width: 15.6rem;
    height: 10.2rem;
    border-radius: 0.8rem;
  }
`;

const MyChallengeItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.2rem;
`;

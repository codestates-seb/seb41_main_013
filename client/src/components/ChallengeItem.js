import styled from "styled-components";
import { Link } from "react-router-dom";
import { InfoTag } from "./Tag";
import { ProgressBar } from "./ProgressBar";
import { Btn } from "./Button";
import theme from "./theme";

export const HomeChallengeItem = (props) => {
  return (
      <HomeChallengeItemWrapper
        paddingTop={props.paddingTop}
        paddingBottom={props.paddingBottom}
      >
        <StyledLink to={props.NavTo}>
          <img src={props.imgUrl} alt={props.challengeTitle} />
          <ChallengeTitle>{props.challengeTitle}</ChallengeTitle>
        </StyledLink>
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
        <StyledLink to={props.NavTo}>
          <img src={props.imgUrl} alt={props.challengeTitle}/>
        </StyledLink>
        <MyChallengeItemInfo>
          <StyledLink to={props.NavTo}>
            <ChallengeTitle>{props.challengeTitle}</ChallengeTitle>
          </StyledLink>
          <TagWrapper>
            <InfoTag label={props.challengerNum} />
            <InfoTag label={props.challengeFrequency} />
            <InfoTag label={props.challengeDate} />
            <InfoTag label={props.challengeTime} />
          </TagWrapper>
          <ProgressBar
            progress={props.progress}
            label={props.progress}
          />
          <Link to={`/mychallenge/${props.challengeId}/upload`}>
            <Btn
              background={theme.color.green}
              width="100%"
              btnText="인증하기"
              margin="0"
            />
          </Link>
        </MyChallengeItemInfo>
      </MyChallengeItemWrapper>

  )
};

const HomeChallengeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.paddingTop || "1.3rem"};
  padding-bottom: ${(props) => props.paddingBottom || "0"};
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  width: 50%;

  & img {
    width: 100%;
    aspect-ratio: 1/0.75;
    object-fit: cover;
    border-radius: 0.8rem;
    margin-bottom: 0.6rem;
    cursor: pointer;
  }
`;

const ChallengeTitle = styled.div`
  font-size: 1.4rem;
  padding-bottom: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const MyChallengeItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.5rem;
  width: 100%;

  & > a {
    width: 50%;
  }

  & img {
    width: 100%;
    border-radius: 0.8rem;
    cursor: pointer;
    aspect-ratio: 1/0.75;
    object-fit: cover;
  }
`;

const MyChallengeItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
`;

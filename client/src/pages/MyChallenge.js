import styled from "styled-components";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { MyChallengeItem } from "../components/ChallengeItem";

const MyChallenge = () => {
  const categoryId = 1;
  const challengeId = 1;

  return (
    <MyChallengeWrapper>
      {/* map */}
      <MyChallengeItemContainer>
        <MyChallengeItem
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
          challengeTime="8:00 - 9:30"
          progress={80}
          label={80}
          NavTo={`/challenges/:${categoryId}/:${challengeId}`}
        />
        <MyChallengeItem
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
          challengeTime="8:00 - 9:30"
          progress={30}
          label={30}
          NavTo={`/challenges/:${categoryId}/:${challengeId}`}
        />
        <MyChallengeItem
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
          challengeTime="8:00 - 9:30"
          progress={55}
          label={55}
          NavTo={`/challenges/:${categoryId}/:${challengeId}`}
        />
      </MyChallengeItemContainer>
      <CreateBtn NavTo="/challenges/create" />
      <BackToTopBtn />
    </MyChallengeWrapper>
  );
};

const MyChallengeWrapper = styled.div`
  margin-top: 5.2rem;
  margin-bottom: 6.5rem;
`;

const MyChallengeItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyChallenge;
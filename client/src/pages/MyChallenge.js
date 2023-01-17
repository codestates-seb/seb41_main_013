import styled from "styled-components";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { MyChallengeItem } from "../components/ChallengeItem";
import { Footer } from "../components/Footer";
import { MainHeader } from "../components/Header";

const MyChallenge = () => {
  return (
    <>
      <MainHeader />
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
        />
        <MyChallengeItem
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
          challengeTime="8:00 - 9:30"
          progress={30}
          label={30}
        />
        <MyChallengeItem
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
          challengeTime="8:00 - 9:30"
          progress={55}
          label={55}
        />
      </MyChallengeItemContainer>
      {/* Link Router */}
      <CreateBtn />
      <BackToTopBtn />
      <Footer />
    </>
  );
};

const MyChallengeItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyChallenge;
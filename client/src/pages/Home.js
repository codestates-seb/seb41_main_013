import styled from "styled-components";
import { HomeCategory } from "../components/Category";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { MainHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { BackToTopBtn } from "../components/Button";

const Home = () => {
  return (
    <>
      <MainHeader />
      <HomeCategory />
      <StyledH1>BEST</StyledH1>
      {/* map */}
      <HomeChallengeItemContainer>
        {/* <HomeChallengeItem
          imgUrl={challenge.imgUrl}
          challengeTitle={challenge.title}
          challengerNum={challenge.challengerNum}
          challengeFrequency={challenge.frequency}
          challengeDate={challenge.date}
        /> */}
        <HomeChallengeItem
          imgUrl=""
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
        />
        <HomeChallengeItem
          imgUrl=""
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
        />
      </HomeChallengeItemContainer>
      <BackToTopBtn />
      <Footer position="fixed" bottom="0" />
    </>
  );
};

const StyledH1 = styled.h1`
  font-size: 2rem;
`;

const HomeChallengeItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Home;
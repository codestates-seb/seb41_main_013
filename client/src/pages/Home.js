// todo: HomeCategory Navto props
import styled from "styled-components";
import { HomeCategory } from "../components/Category";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { BackToTopBtn } from "../components/Button";

const Home = () => {
  const categoryId = 1;
  const challengeId = 1;
  
  return (
    <HomeWrapper>
      <HomeCategory NavTo="challenges" />
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
          NavTo={`/challenges/${categoryId}/${challengeId}`}
        />
        <HomeChallengeItem
          imgUrl=""
          challengeTitle="아침 8시 기상 후 조깅하기"
          challengerNum="299명"
          challengeFrequency="주 3일"
          challengeDate="1.18 - 1.25"
          NavTo={`/challenges/${categoryId}/${challengeId}`}
        />
      </HomeChallengeItemContainer>
      <BackToTopBtn />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  margin-top: 15rem;
  margin-bottom: 6.5rem;
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
`;

const HomeChallengeItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Home;
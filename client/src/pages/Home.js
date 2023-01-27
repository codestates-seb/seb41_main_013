import styled from "styled-components";
import { HomeCategory } from "../components/Category";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { BackToTopBtn } from "../components/Button";
import { Loading } from "../components/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
	const [challenges, setChallenges] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);

	useEffect(() => {
		getAllChallengesList();
	}, []);

	const getAllChallengesList = async () => {
		if (!hasMoreData) return;
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/hot?page=${page}`,
			);
			if (response.data.length < 10) {
				setHasMoreData(false);
			}
			setChallenges([...challenges, ...response.data]);
		} catch (error) {
			console.error(error);
		}
	};

  const loadMoreData = () => {
    setPage(page + 1);
    getAllChallengesList();
  };

	const categoryId = {
		"우리 동네": "0",
		"운동": "1",
		"규칙적인 생활": "2",
		"기타": "3",
	};
  
  return (
    <HomeWrapper>
      <HomeCategory NavTo="challenges" />
      <StyledH1>BEST</StyledH1>
      <InfiniteScroll
				className="infinite-scroll"
        dataLength={challenges.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<Loading />}
      >
        {challenges.map((challenge) => (
          <HomeChallengeItem
            imgUrl={challenge.imageUrl}
            challengeTitle={challenge.title}
            challengerNum={challenge.challengerCount}
            challengeFrequency={challenge.frequency}
            challengeDate={`${challenge.StartAt} - ${challenge.EndAt}`}
            NavTo={`/challenges/${categoryId[challenge.category]}/${challenge.challengeId}`}
          />))}
      </InfiniteScroll>
      <BackToTopBtn />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
	margin-top: 15rem;
	margin-bottom: 6.5rem;

	& .infinite-scroll {
		display: flex;
    flex-wrap: wrap;
		align-items: center;
		justify-content: center;

		::-webkit-scrollbar {
			display: none;
		}
	}
`;

const StyledH1 = styled.h1`
	font-size: 2rem;
`;

export default Home;

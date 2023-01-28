import styled from "styled-components";
import { HomeCategory } from "../components/Category";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { BackToTopBtn, Btn } from "../components/Button";
import { Loading } from "../components/Loading";
import { NoData } from "../components/NoData";
import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import theme from "../components/theme";
import { useSelector } from "react-redux";

const Home = () => {
	const [challenges, setChallenges] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [hasData, setHasData] = useState(true);

	const { accessToken } = useSelector(
		(state) => state.loginUserInfo.loginUserInfo,
	);

	useEffect(() => {
		getAllChallengesList();
	}, []);

	const getAllChallengesList = async () => {
		if (!hasMoreData) return;
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/hot?page=${page}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response.data.data.length === 0) { setHasData(false); }
			if (response.data.length < 10) {
				setHasMoreData(false);
			}
			console.log(response.data.data);
			setChallenges([...challenges, ...response.data.data]);
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
      { hasData ?
			(<InfiniteScroll
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
      )
			:
			(<NoData />)
			}
			<BackToTopBtn />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
	position: absolute;
	left: 0;
	top: 15rem;
	bottom: 6.5rem;
	width: 100%;
	padding: 0 1.3rem;

	& .infinite-scroll-component__outerdiv {
		position: relative;
		top: 2.5rem;
		overflow-y: scroll;
		height: 100%;

		::-webkit-scrollbar {
			display: none;
		}
	}

	& .infinite-scroll {
		display: flex;
    flex-wrap: wrap;

		::-webkit-scrollbar {
			display: none;
		}
	}
`;

const StyledH1 = styled.h1`
	font-size: 2rem;
	height: 2.5rem;
	position: fixed;
`;

export default Home;

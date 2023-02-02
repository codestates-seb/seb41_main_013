import styled from "styled-components";
import { HomeCategory } from "../components/Category";
import { HomeChallengeItem } from "../components/ChallengeItem";
import { BackToTopBtn } from "../components/Button";
import { NoData } from "../components/NoData";
import axios from "axios";
import { useState, useEffect } from "react";



const Home = () => {
	const [challenges, setChallenges] = useState([]);
	const [hasData, setHasData] = useState(true);

	useEffect(() => {
		getAllChallengesList();
	}, []);

	const getAllChallengesList = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/hot`,
				{
					withCredentials: true,
				},
			);
			if (response.data.length === 0) {
				setHasData(false);
			}
			setChallenges(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const categoryId = {
		우리동네: "0",
		운동: "1",
		생활습관: "2",
		기타: "3",
	};

	return (
		<HomeWrapper>
			<HomeCategory NavTo="challenges" />
			<StyledH1>BEST</StyledH1>
			{hasData ? (
				<HomeChallengeItemContainer>
					{challenges.map((challenge) => (
						<HomeChallengeItem
							imgUrl={challenge.challengeImageUrl}
							challengeTitle={challenge.title}
							challengerNum={`${challenge.challengerCount}명`}
							challengeFrequency={challenge.frequency}
							challengeDate={`${challenge.startAt} - ${challenge.endAt}`}
							NavTo={`/challenges/${categoryId[challenge.category]}/${
								challenge.challengeId
							}`}
						/>
					))}
				</HomeChallengeItemContainer>
			) : (
				<NoData />
			)}
			<BackToTopBtn />
		</HomeWrapper>
	);
};

const HomeWrapper = styled.div`
	/* border: 1px solid black; */
	position: absolute;
	left: 0;
	top: 15rem;
	bottom: 6.5rem;
	margin-bottom: 6.5rem;
	width: 100%;
	padding: 0 1.3rem;
`;

const HomeChallengeItemContainer = styled.div`
	position: relative;
	top: 4.5rem;
	overflow-y: scroll;
	height: 100%;
	display: flex;
	flex-wrap: wrap;

	::-webkit-scrollbar {
		display: none;
	}
`;

const StyledH1 = styled.h1`
	font-size: 2.5rem;
	height: 3rem;
	position: fixed;
	left: 2.6rem;
	top: 16rem;
`;

export default Home;

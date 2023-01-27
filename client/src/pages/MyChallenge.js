import styled from "styled-components";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { MyChallengeItem } from "../components/ChallengeItem";
import { Loading } from "../components/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const MyChallenge = () => {
	const [challenges, setChallenges] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);

	const memberId = 1;

	useEffect(() => {
		getMyChallengesList();
	}, []);

	const getMyChallengesList = async () => {
		if (!hasMoreData) return;
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challengers/${memberId}/challenging?page=${page}`,
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
		getMyChallengesList();
	};

  const categoryId = {
		"우리 동네": "0",
		"운동": "1",
		"규칙적인 생활": "2",
		"기타": "3",
	};

	return (
		<MyChallengeWrapper>
			<InfiniteScroll
				className="infinite-scroll"
				dataLength={challenges.length}
				next={loadMoreData}
				hasMore={hasMoreData}
				loader={<Loading />}
			>
				{challenges.map((challenge) => (
					<MyChallengeItem
						// imgUrl={challenge.imageUrl}
						challengeTitle={challenge.title}
						challengerNum={challenge.challengerCount}
						challengeFrequency={challenge.frequency}
						challengeDate={`${challenge.StartAt} - ${challenge.EndAt}`}
						challengeTime={`${challenge.snapshotStartAt} - ${challenge.snapshotEndAt}`}
						// progress={challenge.progress}
						// NavTo={`/challenges/${categoryId[challenge.category]}/${challenge.challengeId}`}
					/>
				))}
			</InfiniteScroll>
			<CreateBtn NavTo="/challenges/create" />
			<BackToTopBtn />
		</MyChallengeWrapper>
	);
};

const MyChallengeWrapper = styled.div`
	margin-top: 5.2rem;
	margin-bottom: 6.5rem;
	/* height: 100%; */

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

export default MyChallenge;

import styled from "styled-components";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { MyChallengeItem } from "../components/ChallengeItem";
import { Logout } from "../components/Logout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NoDataDiv } from "../components/NoData";

const MyChallenge = () => {
	const [challenges, setChallenges] = useState([]);
	const [hasData, setHasData] = useState(true);
	const isLogin = useSelector((state) => state.loginStatus.status);

	const { memberId } = useSelector(
		(state) => state.loginUserInfo.loginUserInfo,
	);
	const accessToken = localStorage.getItem("authorization");

	useEffect(() => {
		getMyChallengesList();
	}, []);

	const getMyChallengesList = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challengers/${memberId}/challenging`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
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
		<Wrapper>
			{isLogin ? (
				hasData ? (
					<MyChallengeWrapper>
						<MyChallengeItemContainer>
							{challenges.map((challenge) => (
								<MyChallengeItem
									imgUrl={challenge.challengeImageUrl}
									challengeTitle={challenge.challengeName}
									challengerNum={`${challenge.challengerCount}명`}
									challengeFrequency={challenge.frequency}
									challengeDate={`${challenge.startAt} - ${challenge.endAt}`}
									challengeTime={`${challenge.snapshotStartAt} - ${challenge.snapshotEndAt}`}
									progress={challenge.progress}
									NavTo={`/challenges/${categoryId[challenge.category]}/${
										challenge.challengeId
									}`}
									challengeId={challenge.challengeId}
								/>
							))}
						</MyChallengeItemContainer>
						<CreateBtn NavTo="/challenges/create" />
						<BackToTopBtn />
					</MyChallengeWrapper>
				) : (
					<>
						<NoDataDiv text="등록된 마이챌린지" />
						<CreateBtn NavTo="/challenges/create" />
					</>
				)
			) : (
				<Logout />
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	left: 0;
	top: 5.2rem;
	bottom: 6.5rem;
	overflow-y: scroll;
	width: 100%;
	padding: 0 1.3rem;
	/* padding-bottom: 2.5rem; */

	::-webkit-scrollbar {
		display: none;
	}
`;

const MyChallengeItemContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const MyChallengeWrapper = styled.div`
	/* height: 100%; */
`;

export default MyChallenge;

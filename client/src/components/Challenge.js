// HomeChallenge
// MyChallenge
// MyPageChallenge
import styled from "styled-components";
import sample from "../images/example2.jpeg";
import challenge from "../images/challenge.png";
import theme from "./theme";

export const CompleteChallenge = (props) => {
	return (
		<CompleteChallengeContainer>
			<img alt="challenge" src={props.src || sample} />
			{props.title}
		</CompleteChallengeContainer>
	);
};

export const CreateChallenge = (props) => {
	return (
		<CreateChallengeContainer>
			<ChallengeImg src={props.src || sample} />
			{props.title}
		</CreateChallengeContainer>
	);
};

export const ChallengeState = () => {
	return (
		<ChallengeStateContainer>
			<div className="title">
				<img alt="challengeState" src={challenge} />
				<span>챌린지 현황</span>
			</div>
			<div className="container">
				<div>
					<span>0</span>
					<span>참여중</span>
				</div>
				<div>
					<span>0</span>
					<span>완료</span>
				</div>
				<div>
					<span>0</span>
					<span>생성</span>
				</div>
			</div>
		</ChallengeStateContainer>
	);
};

const ChallengeStateContainer = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	height: 15rem;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-size: 1.4rem;

	.title {
		display: flex;
		align-items: center;
		gap: 1rem;

		img {
			width: 2rem;
			height: 2rem;
		}
	}

	.container {
		width: 36.4rem;
		height: 8.1rem;
		display: flex;

		div {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		div:not(:last-of-type) {
			border-right: 1px solid black;
			width: 1rem;
		}
	}
`;

const CompleteChallengeContainer = styled.div`
	border: 1px solid black;
	width: 18.2rem;
	height: 18.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	img {
		width: 16rem;
		height: 14.5rem;
	}
`;

const ChallengeImg = styled.div`
	background-image: url(${(props) => props.src});
	background-size: contain;
	background-position: center center;
	width: 16rem;
	height: 14.5rem;
`;

const CreateChallengeContainer = styled.div`
	border: 1px solid black;
	width: 18.2rem;
	height: 19.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

// HomeChallenge
// MyChallenge
// MyPageChallenge
import styled from "styled-components";
import { Btn } from "./Button";
import theme from "./theme";
import { IoClose } from "react-icons/io5";

export const CompletedChallenge = (props) => {
	return (
		<CompleteChallengeContainer>
			<img alt="challenge" src={props.src || "/images/example2.jpeg"} />
			{props.title}
		</CompleteChallengeContainer>
	);
};

export const CreatedChallenge = (props) => {
	return (
		<CreateChallengeContainer>
			<ChallengeImg src={props.src || "images/example2.jpeg"}>
				<Btn
					onClick={props.onClick}
					btnText={<IoClose />}
					width="1.5rem"
					height="1.5rem"
					size="1.4rem"
					background={`${theme.color.orange}`}
				/>
			</ChallengeImg>
			{props.title}
		</CreateChallengeContainer>
	);
};

export const ChallengeState = (props) => {
	return (
		<ChallengeStateContainer>
			<div className="title">
				<img alt="challengeState" src="images/challenge.png" />
				<span>챌린지 현황</span>
			</div>
			<div className="container">
				<div>
					<span>{props.doing || "0"}</span>
					<span>참여중</span>
				</div>
				<div>
					<span>{props.complete || "0"}</span>
					<span>완료</span>
				</div>
				<div>
					<span>{props.create || "0"}</span>
					<span>생성</span>
				</div>
			</div>
		</ChallengeStateContainer>
	);
};

const ChallengeStateContainer = styled.div`
	/* border: 1px solid black; */
	width: 100%;
	height: 15rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	.title {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 2.5rem;
		padding: 0 1rem;

		img {
			width: 2.5rem;
			height: 2.5rem;
		}
	}

	.container {
		/* width: 100%; */
		height: 8.1rem;
		display: flex;
		padding: 0 1rem;

		div {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 2.5rem;
		}

		div:not(:last-of-type) {
			border-right: 1px solid black;
			width: 1rem;
		}
	}
`;

const CompleteChallengeContainer = styled.div`
	border: 1px solid black;
	width: 18rem;
	height: 18.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	font-size: 1.4rem;
	margin-top: 2rem;

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
	width: 18rem;
	height: 19.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	font-size: 1.4rem;
	margin-top: 2.5rem;
`;

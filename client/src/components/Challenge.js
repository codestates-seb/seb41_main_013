// HomeChallenge
// MyChallenge
// MyPageChallenge
import styled from "styled-components";
import sample from "../images/example2.jpeg";
import challenge from "../images/challenge.png";
import { Btn } from "./Button";
import theme from "./theme";
import { IoClose } from "react-icons/io5";

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
			<ChallengeImg src={props.src || sample}>
				<Btn
					className="deleteBtn"
					onClick={props.onClick}
					btnText={<IoClose />}
					width="1.5rem"
					height="1.5rem"
					size="1.1rem"
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
				<img alt="challengeState" src={challenge} />
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
	gap: 1rem;
	font-size: 1.4rem;
	margin-bottom: 2.5rem;

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

	.deleteBtn {
		display: none;
	}
`;

const CreateChallengeContainer = styled.div`
	border: 1px solid black;
	width: 18.2rem;
	height: 19.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	font-size: 1.4rem;
	margin-bottom: 2.5rem;

	/* .deleteBtn {
		position: fixed;
		left: 0;
	} */
`;

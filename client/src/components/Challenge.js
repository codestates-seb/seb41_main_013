import styled from "styled-components";
import { Btn } from "./Button";
import theme from "./theme";
import { IoClose } from "react-icons/io5";
import { random } from "../images/random";
import { Link } from "react-router-dom";

export const CompletedChallenge = (props) => {
	return (
		<CompleteChallengeContainer>
			<img
				alt="challenge"
				src={props.src || random[Math.floor(Math.random() * random.length)]}
			/>
			{props.title}
		</CompleteChallengeContainer>
	);
};

export const CreatedChallenge = (props) => {
	const categoryId = {
		우리동네: "0",
		운동: "1",
		생활습관: "2",
		기타: "3",
	};
	return (
		<CreateChallengeContainer>
			<ChallengeImg src={props.url}>
				<Btn
					onClick={props.onClick}
					btnText={<IoClose />}
					width="1.5rem"
					height="1.5rem"
					size="1.4rem"
					background={`${theme.color.orange}`}
				/>
			</ChallengeImg>
			<ChallengeLink
				to={`/challenges/${categoryId[props.category]}/${props.challengeId}`}
			>
				<p>Challenge Id : {props.challengeId}</p>
				{props.title}
			</ChallengeLink>
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
	/* border: 1px solid black; */
	width: 18rem;
	height: 18.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	font-size: 1.4rem;
	/* margin-top: 2rem; */

	img {
		width: 16rem;
		height: 14.5rem;
	}
`;

const ChallengeLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

const ChallengeImg = styled.div`
	/* border: 1px solid red; */
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	width: 16rem;
	height: 14.5rem;
`;

const CreateChallengeContainer = styled.div`
	/* border: 1px solid black; */
	width: 18rem;
	height: 19.3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	font-size: 1.4rem;
	/* margin-top: 2.5rem; */

	p {
		font-size: 1.3rem;
	}
`;

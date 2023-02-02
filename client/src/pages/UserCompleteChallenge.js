import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BackToTopBtn, Btn } from "../components/Button";
import { CompletedChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";
import theme from "../components/theme";

export const UserCompleteChallenge = () => {
	const [completeChallenge, setCompleteChallenge] = useState([]);

	useEffect(() => {
		getCompleteChallenge();
	}, []);

	const accessToken = localStorage.getItem("authorization");
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);

	const getCompleteChallenge = async () => {
		try {
			const usercomplete = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challengers/${loginUserInfo.memberId}/challenged`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);

			setCompleteChallenge(usercomplete.data);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Container>
			<TitleHeader title="완료한 챌린지" />
			<ChallengeWrap>
				{completeChallenge.length === 0 ? (
					<div className="noData">
						<p>완료한 챌린지가 없어요.</p>
						<p>참여한 챌린지가 없다면 지금 참여하러 가볼까요?</p>
						<Link to="/">
							<Btn
								btnText="챌린지 구경가기"
								background={theme.color.green}
								width="12rem"
							/>
						</Link>
					</div>
				) : (
					completeChallenge.map((challenge, index) => {
						return (
							<div key={index} className="challenge">
								<CompletedChallenge
									title={challenge.title}
									src={challenge.src}
								/>
							</div>
						);
					})
				)}
			</ChallengeWrap>
			<BackToTopBtn bottom="3rem" />
		</Container>
	);
};
const Container = styled.div`
	position: absolute;
	left: 0;
	width: 100%;
	height: 100%;
	/* border: 1px solid black; */
`;
const ChallengeWrap = styled.div`
	height: 100%;
	position: relative;
	overflow: scroll;
	display: flex;
	flex-wrap: wrap;
	margin-top: 5.2rem;
	padding: 0 1.3rem 8rem 1.3rem;

	::-webkit-scrollbar {
		display: none;
	}

	.noData {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: 5rem;
		font-size: 2rem;
	}

	.challenge {
		width: 50%;
		/* height: 18.3rem; */
	}
`;

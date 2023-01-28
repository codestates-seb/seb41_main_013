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
					withCredentials: true,
				},
			);
			console.log(usercomplete.data);
			setCompleteChallenge(usercomplete.data);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
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
							<div key={index}>
								<CompletedChallenge
									title={challenge.title}
									src={challenge.src}
								/>
							</div>
						);
					})
				)}
				{/* <CompletedChallenge
					title="3끼 챙겨먹기"
					src={"/images/example2.jpeg"}
				/>
				<CompletedChallenge title="5kg 감량" src={"/images/미모티콘.png"} />
				<CompletedChallenge title="매일 조깅" />
				<CompletedChallenge title="산책 하루에 30분 이상" />
				<CompletedChallenge title="체지방 3kg 감량" />
				<CompletedChallenge title="근육량 2kg 증가" />
				<CompletedChallenge title="1일 1팩" />
				<CompletedChallenge title="아침 7시 기상" />
				<CompletedChallenge title="일주일에 책 한권 이상 읽기" />
				<CompletedChallenge title="매일 헬스장 출석 체크" />
				<CompletedChallenge title="아이고 힘들어" /> */}
			</ChallengeWrap>
			<BackToTopBtn bottom="3rem" />
		</>
	);
};

const ChallengeWrap = styled.div`
	/* border: 1px solid red; */
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 5.2rem;
	/* margin-bottom: 3rem; */
	/* position: absolute;
	top: 5.2rem; */

	.noData {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		gap: 5rem;
		font-size: 2rem;
	}
`;

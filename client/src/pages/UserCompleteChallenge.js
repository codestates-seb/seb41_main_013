import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { CompletedChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";

export const UserCompleteChallenge = () => {
	return (
		<>
			<TitleHeader title="완료한 챌린지" />
			<ChallengeWrap>
				<CompletedChallenge
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
				<CompletedChallenge title="아이고 힘들어" />
				<BackToTopBtn />
			</ChallengeWrap>
		</>
	);
};

const ChallengeWrap = styled.div`
	width: 36.4rem;
	height: 79.2rem;
	overflow: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { CompleteChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";

export const UserCompleteChallenge = () => {
	return (
		<>
			<TitleHeader title="완료한 챌린지" />
			<ChallengeWrap>
				<CompleteChallenge title="3끼 챙겨먹기" src={"/images/example2.jpeg"} />
				<CompleteChallenge title="5kg 감량" src={"/images/미모티콘.png"} />
				<CompleteChallenge title="매일 조깅" />
				<CompleteChallenge title="산책 하루에 30분 이상" />
				<CompleteChallenge title="체지방 3kg 감량" />
				<CompleteChallenge title="근육량 2kg 증가" />
				<CompleteChallenge title="1일 1팩" />
				<CompleteChallenge title="아침 7시 기상" />
				<CompleteChallenge title="일주일에 책 한권 이상 읽기" />
				<CompleteChallenge title="매일 헬스장 출석 체크" />
				<CompleteChallenge title="아이고 힘들어" />
				<BackToTopBtn left="35rem" />
			</ChallengeWrap>
		</>
	);
};

const ChallengeWrap = styled.div`
	height: 79.2rem;
	overflow: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 2.5rem;
`;

import { useState } from "react";
import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { CreateChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";

export const UserCreateChallenge = () => {
	const [deleteChall, setDeleteChall] = useState(false);

	const deleteChallengeBtn = () => {
		setDeleteChall(!deleteChall);
	};

	const onClickToCancel = () => {
		setDeleteChall(!deleteChall);
	};

	return (
		<>
			<TitleHeader title="생성한 챌린지" />
			<ChallengeWrap>
				{deleteChall && (
					<TwoBtnModal
						modalText="정말 삭제하시겠습니까?"
						btnTextOrg="삭제"
						btnTextGry="취소"
						onClickGry={onClickToCancel}
					/>
				)}
				<CreateChallenge
					onClick={deleteChallengeBtn}
					deleteChall={deleteChall}
					title="3끼 챙겨먹기"
					src={"/images/example2.jpeg"}
				/>
				<CreateChallenge title="5kg 감량" src={"/images/미모티콘.png"} />
				<CreateChallenge title="매일 조깅" />
				<CreateChallenge title="산책 하루에 30분 이상" />
				<CreateChallenge title="체지방 3kg 감량" />
				<CreateChallenge title="근육량 2kg 증가" />
				<CreateChallenge title="1일 1팩" />
				<CreateChallenge title="아침 7시 기상" />
				<CreateChallenge title="일주일에 책 한권 이상 읽기" />
				<CreateChallenge title="매일 헬스장 출석 체크" />
				<CreateChallenge title="아이고 힘들어" />
				<CreateChallenge title="아이고 힘들어" />
				<BackToTopBtn bottom="5rem" left="16rem" />
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

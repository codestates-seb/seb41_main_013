import { useState } from "react";
import styled from "styled-components";
import { BackToTopBtn } from "../components/Button";
import { CreatedChallenge } from "../components/Challenge";
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
				<CreatedChallenge
					onClick={deleteChallengeBtn}
					deleteChall={deleteChall}
					title="3끼 챙겨먹기"
					src={"/images/example2.jpeg"}
				/>
				<CreatedChallenge title="5kg 감량" src={"/images/미모티콘.png"} />
				<CreatedChallenge title="매일 조깅" />
				<CreatedChallenge title="산책 하루에 30분 이상" />
				<CreatedChallenge title="체지방 3kg 감량" />
				<CreatedChallenge title="근육량 2kg 증가" />
				<CreatedChallenge title="1일 1팩" />
				<CreatedChallenge title="아침 7시 기상" />
				<CreatedChallenge title="일주일에 책 한권 이상 읽기" />
				<CreatedChallenge title="매일 헬스장 출석 체크" />
				<CreatedChallenge title="아이고 힘들어" />
				<CreatedChallenge title="아이고 힘들어" />
			</ChallengeWrap>
			<BackToTopBtn bottom="3rem" />
		</>
	);
};

const ChallengeWrap = styled.div`
	border: 1px solid red;
	width: 100%;
	/* height: 79.2rem; */
	overflow: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	position: absolute;
`;

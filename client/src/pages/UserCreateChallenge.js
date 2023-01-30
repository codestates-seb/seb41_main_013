import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BackToTopBtn, Btn } from "../components/Button";
import { Link } from "react-router-dom";
import { CreatedChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";
import { useSelector } from "react-redux";
import theme from "../components/theme";

export const UserCreateChallenge = () => {
	const [createChallenge, setCreateChallenge] = useState([]);
	const [deleteChall, setDeleteChall] = useState(false);

	useEffect(() => {
		getCreateChallenge();
	}, []);

	const accessToken = localStorage.getItem("authorization");
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);

	const getCreateChallenge = async () => {
		try {
			const usercreate = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/host/${loginUserInfo.memberId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			console.log(usercreate.data);
			setCreateChallenge(usercreate.data.data);
		} catch (e) {
			console.log(e);
		}
	};

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
						// onClickOrg={}
					/>
				)}
				{/* {createChallenge.length === 0 ? (
					<div className="noData">
						<p>생성한 챌린지가 없어요.</p>
						<p>새로운 챌린지를 만들러 가볼까요?</p>
						<Link to="/challenges/create">
							<Btn
								btnText="챌린지 만들어보기"
								background={theme.color.green}
								width="12rem"
							/>
						</Link>
					</div>
				) : (
					createChallenge.map((challenge, index) => {
						return (
							<div key={index}>
								<CreatedChallenge title={challenge.title} src={challenge.src} />
							</div>
						);
					})
				)} */}
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
	/* border: 1px solid red; */
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 5.2rem;
	/* margin-bottom: 2rem; */
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

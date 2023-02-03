import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BackToTopBtn, Btn } from "../components/Button";
import { Link } from "react-router-dom";
import { CreatedChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";
import { OneBtnModal, TwoBtnModal } from "../components/Modal";
import { useSelector } from "react-redux";
import theme from "../components/theme";

export const UserCreateChallenge = () => {
	const [createChallenge, setCreateChallenge] = useState([
		{
			challengeId: "",
			title: "",
			status: "",
			count: "",
			category: "",
		},
	]);
	const [challengeId, setChallengeId] = useState(0);
	const [modalOpen, setModalOpen] = useState({
		request: false,
		refuse: false,
		success: false,
	});

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
			const { data } = usercreate.data;

			setCreateChallenge(data);
		} catch (e) {
			console.log(e);
		}
	};

	const onClickToCancel = () => {
		setModalOpen(false);
	};

	const deleteChallenge = async (challengeId) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/${challengeId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);

			if (response) {
				setModalOpen((prev) => {
					return { ...prev, success: true };
				});
				getCreateChallenge();
			}
		} catch (e) {
			console.log(e);
		}
	};

	const onClickToDelete = () => {
		setModalOpen((prev) => {
			return { ...prev, request: false };
		});
		deleteChallenge(challengeId);
	};

	return (
		<Container>
			<TitleHeader title="생성한 챌린지" />
			<ChallengeWrap>
				{modalOpen.request && (
					<TwoBtnModal
						modalText="정말 삭제하시겠습니까?"
						btnTextOrg="삭제"
						btnTextGry="취소"
						onClickGry={onClickToCancel}
						onClickOrg={onClickToDelete}
					/>
				)}
				{modalOpen.refuse && (
					<OneBtnModal
						modalText="참여자가 0명이고 시작전인 챌린지만 삭제 가능합니다."
						btnText="확인"
						background={theme.color.orange}
						onClick={onClickToCancel}
					/>
				)}
				{modalOpen.success && (
					<OneBtnModal
						modalText="삭제되었습니다."
						btnText="확인"
						background={theme.color.orange}
						onClick={onClickToCancel}
					/>
				)}

				{createChallenge.length === 0 ? (
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
						const onClick = () => {
							if (challenge.status === "시작전" && challenge.count === 0) {
								setModalOpen((prev) => {
									return { ...prev, request: true };
								});
								setChallengeId(challenge.challengeId);
							} else {
								setModalOpen((prev) => {
									return { ...prev, refuse: true };
								});
							}
						};
						return (
							<div key={index} className="challenge">
								<CreatedChallenge
									title={challenge.title}
									src={challenge.src}
									challengeId={challenge.challengeId}
									onClick={onClick}
									category={challenge.category}
									url={challenge.challengeImageUrl}
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
		/* height: 19.3rem; */
	}
`;

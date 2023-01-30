import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BackToTopBtn, Btn } from "../components/Button";
import { Link } from "react-router-dom";
import { ChallengeState, CreatedChallenge } from "../components/Challenge";
import { TitleHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";
import { useSelector } from "react-redux";
import theme from "../components/theme";

export const UserCreateChallenge = () => {
	// const [createChallenge, setCreateChallenge] = useState({
	// 	challengeId: "",
	// 	challengeStatus: "",
	// 	challengerCount: 0,
	// });
	const [createChallenge, setCreateChallenge] = useState([
		{
			id: "",
			title: "",
			status: "",
			count: "",
		},
	]);
	const [deleteChall, setDeleteChall] = useState(false);

	useEffect(() => {
		getCreateChallenge();
	}, []);

	const accessToken = localStorage.getItem("authorization");
	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);

	const getCreateChallenge = async () => {
		try {
			const usercreate = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/host/1`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			const { data } = usercreate.data;
			// console.log(data);
			// data.map((el) => console.log(el));
			setCreateChallenge(data);
			setCreateChallenge(data.filter(({}) => ({})));

			// console.log(createChallenge);
		} catch (e) {
			console.log(e);
		}
	};
	console.log("createChallenge : ", createChallenge);
	const deleteChallengeBtn = () => {
		setDeleteChall(!deleteChall);
		// console.log(deleteChall);
	};

	const onClickToCancel = () => {
		setDeleteChall(!deleteChall);
	};

	// const challengeDelete = async () => {

	// }

	// const onClickToDelete = () => {

	// }

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
						// console.log(challenge.challengeId);
						return (
							<div key={index} className="div">
								<CreatedChallenge
									title={challenge.title}
									src={challenge.src}
									challengeId={challenge.challengeId}
									onClick={deleteChallengeBtn}
								/>
							</div>
						);
					})
				)}
			</ChallengeWrap>
			<BackToTopBtn bottom="3rem" />
		</>
	);
};

const ChallengeWrap = styled.div`
	/* border: 1px solid black; */
	width: 100%;
	/* height: 100vh; */
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 5.2rem;
	gap: 1rem;
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

	.div {
		/* border: 1px solid red; */
		height: 19.3rem;
	}
`;

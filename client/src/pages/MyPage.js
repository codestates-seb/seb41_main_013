import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Btn } from "../components/Button";
import { ChallengeState } from "../components/Challenge";
import { MypageHeader } from "../components/Header";
import { OneBtnModal, TwoBtnModal } from "../components/Modal";
import { MypageSetting } from "../components/MypageSetting";
import { NavTitle } from "../components/NavItem";
import theme from "../components/theme";
import { signout, getLoginUser } from "../redux/userSlice";
import profileImg0 from "../images/profileImg0.png";
import profileImg1 from "../images/profileImg1.png";
import profileImg2 from "../images/profileImg2.png";
import profileImg3 from "../images/profileImg3.png";

export const MyPage = (props) => {
	const [modal, setModal] = useState({
		logout: false,
		quit: false,
		success: false,
	});
	const [menuOpen, setMenuOpen] = useState(false);
	const [challengeStatus, setChallengeStatus] = useState({
		participate: 0,
		complete: 0,
		create: 0,
	});

	useEffect(() => {
		getUserInfo();
		getUserStatus();
	}, []);

	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);
	const isLogin = useSelector((state) => state.loginStatus.status);
	const accessToken = localStorage.getItem("authorization");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getUserInfo = async () => {
		if (isLogin) {
			try {
				const result = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/api/members/${loginUserInfo.memberId}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					},
				);

				if (result.status === 200) {
					dispatch(
						getLoginUser({
							...loginUserInfo,
							name: result.data.name,
							profileImageId: result.data.profileImageId,
						}),
					);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	const profileImgBox = [profileImg0, profileImg1, profileImg2, profileImg3];
	const randomIdx = Math.floor(Math.random() * profileImgBox.length);

	if (!loginUserInfo.profileImg) {
		dispatch(
			getLoginUser({ ...loginUserInfo, profileImg: profileImgBox[randomIdx] }),
		);
	}

	const deleteUser = async () => {
		try {
			const result = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/members/${loginUserInfo.memberId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);

			if (result.status === 204) {
				localStorage.removeItem("authorization");
				dispatch(getLoginUser(""));
				dispatch(signout());
				setModal((prev) => {
					return { ...prev, success: true };
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getUserStatus = async () => {
		try {
			const userdoing = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challengers/${loginUserInfo.memberId}/challenging`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);

			setChallengeStatus((prev) => {
				return { ...prev, participate: userdoing.data.length };
			});

			const usercomplete = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challengers/${loginUserInfo.memberId}/challenged`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);

			setChallengeStatus((prev) => {
				return { ...prev, complete: usercomplete.data.length };
			});

			const usercreate = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges/host/${loginUserInfo.memberId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);

			setChallengeStatus((prev) => {
				return { ...prev, create: usercreate.data.data.length };
			});
		} catch (e) {
			console.log(e);
		}
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const modalToLogout = () => {
		setModal((prev) => {
			return { ...prev, logout: true };
		});
	};

	const onClickToLogout = () => {
		localStorage.removeItem("authorization");
		dispatch(getLoginUser(""));
		dispatch(signout());
		navigate("/");
	};

	const modalToCancel = () => {
		setModal(false);
	};

	const modalToQuit = () => {
		setModal((prev) => {
			return { ...prev, quit: true };
		});
	};

	const onClickToQuit = () => {
		setModal((prev) => {
			return { ...prev, quit: false };
		});
		deleteUser();
	};

	return (
		<MypageWrapper>
			{modal.logout && (
				<TwoBtnModal
					modalText="로그아웃 하시겠습니까?"
					btnTextOrg="로그아웃"
					btnTextGry="취소"
					onClickGry={modalToCancel}
					onClickOrg={onClickToLogout}
				/>
			)}
			{modal.quit && (
				<TwoBtnModal
					modalText="정말 탈퇴하시겠습니까?"
					btnTextOrg="탈퇴"
					btnTextGry="취소"
					onClickGry={modalToCancel}
					onClickOrg={onClickToQuit}
				/>
			)}
			{modal.success && (
				<OneBtnModal
					modalText="탈퇴되었습니다!"
					btnText="확인"
					onClick={() => navigate("/")}
				/>
			)}
			<MypageHeader title="마이페이지" onClick={toggleMenu} />
			{isLogin ? (
				<>
					<Container>
						<MypageSetting
							menuOpen={menuOpen}
							modalToLogout={modalToLogout}
							modalToQuit={modalToQuit}
							onClick={toggleMenu}
						/>
						<div className="userInfo">
							<img src={`${loginUserInfo.profileImg}`} alt="avatar" />

							{loginUserInfo.name || "유저이름"}
						</div>
						<ChallengeState
							doing={challengeStatus.participate}
							complete={challengeStatus.complete}
							create={challengeStatus.create}
						/>
						<div className="challengeNav">
							<NavTitle title="생성한 챌린지" link="/userCreate" />
							<NavTitle title="완료한 챌린지" link="/userComplete" />
						</div>
						<div />
					</Container>
				</>
			) : (
				<div className="noneLogin">
					<p>로그인이 필요해요..</p>
					<p>로그인 하러 가기</p>
					<Link to="/login">
						<Btn btnText="클릭" background={theme.color.green} />
					</Link>
				</div>
			)}
		</MypageWrapper>
	);
};

const MypageWrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const Container = styled.div`
	/* border: 1px solid black; */
	position: absolute;
	left: 0;
	top: 5.2rem;
	bottom: 6.5rem;
	overflow: scroll;
	display: flex;
	flex-direction: column;
	gap: 5rem;
	justify-content: flex-start;

	::-webkit-scrollbar {
		display: none;
	}

	.challengeNav {
		width: 100%;
	}

	.userInfo {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 3rem;
		font-size: 1.5rem;
		padding: 1rem;

		img {
			border: 1px solid black;
			width: 50%;
			height: 80%;
			border-radius: 50%;
		}
	}
`;

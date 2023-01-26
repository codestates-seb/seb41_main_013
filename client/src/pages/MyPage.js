import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChallengeState } from "../components/Challenge";
import { MainHeader, MypageHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";
import { MypageSetting } from "../components/MypageSetting";
import { NavTitle } from "../components/NavItem";

export const MyPage = (props) => {
	const [isLogin, setIsLogin] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [logoutModal, setLogoutModal] = useState(false);
	const [quitModal, setQuitModal] = useState(false);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const modalToLogout = () => {
		setLogoutModal(!logoutModal);
	};

	const onClickToLogout = () => {
		navigate("/");
	};

	const modalToQuit = () => {
		setQuitModal(!quitModal);
	};

	return (
		<MypageWrapper>
			{logoutModal && (
				<TwoBtnModal
					modalText="로그아웃 하시겠습니까?"
					btnTextOrg="로그아웃"
					btnTextGry="취소"
					onClickGry={modalToLogout}
					onClickOrg={onClickToLogout}
				/>
			)}
			{quitModal && (
				<TwoBtnModal
					modalText="정말 탈퇴하시겠습니까?"
					btnTextOrg="탈퇴"
					btnTextGry="취소"
					onClickGry={modalToQuit}
					onClickOrg={onClickToLogout}
				/>
			)}
			<MypageHeader title="마이페이지" onClick={toggleMenu} />
			<MypageSetting
				menuOpen={menuOpen}
				modalToLogout={modalToLogout}
				modalToQuit={modalToQuit}
				onClick={toggleMenu}
			/>
			<div />
			<div className="userInfo">
				<img src={props.imgURL || "/images/미모티콘.png"} alt="avatar" />

				{props.name || "유저이름"}
			</div>
			<ChallengeState />
			<div className="challengeNav">
				<NavTitle title="생성한 챌린지" link="/userCreate" />
				<NavTitle title="완료한 챌린지" link="/userComplete" />
			</div>
			<div />
		</MypageWrapper>
	);
};

const MypageWrapper = styled.div`
	/* border: 1px solid orange; */
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 2rem;

	.challengeNav {
		width: 100%;
	}

	.userInfo {
		/* border: 1px solid blue; */
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 3rem;
		font-size: 1.5rem;
		padding: 1rem;

		img {
			border: 1px solid black;
			width: 45%;
			height: 45%;
			border-radius: 50%;
		}
	}
`;

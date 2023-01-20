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
				setMenuOpen={setMenuOpen}
				modalToLogout={modalToLogout}
				modalToQuit={modalToQuit}
			/>
			<div className="userInfo">
				{/* <div> */}
				<img src={props.imgURL || "/images/미모티콘.png"} alt="avatar" />
				{/* </div> */}
				{props.name || "유저이름"}
			</div>
			<ChallengeState />
			<div>
				<NavTitle title="생성한 챌린지" link="/userCreate" />
				<NavTitle title="완료한 챌린지" link="/userComplete" />
			</div>
			<div />
		</MypageWrapper>
	);
};

const MypageWrapper = styled.div`
	border: 1px solid black;
	width: 100%;
	/* height: 100rem; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	.userInfo {
		border: 1px solid red;
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 3rem;
		font-size: 1.4rem;
		padding: 0 1rem;

		img {
			border: 1px solid black;
			width: 45%;
			height: 45%;
			border-radius: 50%;
		}
	}
`;

import { useState } from "react";
import styled from "styled-components";
import { ChallengeState } from "../components/Challenge";
import { Footer } from "../components/Footer";
import { MainHeader, MypageHeader } from "../components/Header";
import { MypageSetting } from "../components/MypageSetting";
import { NavTitle } from "../components/NavItem";

const MypageWrapper = styled.div`
	border: 1px solid black;
	width: 39rem;
	height: 84.4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	.userInfo {
		width: 36.4rem;
		height: 15rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
		font-size: 1.4rem;

		img {
			border: 1px solid black;
			width: 15rem;
			height: 15rem;
			border-radius: 50%;
		}
	}
`;

export const Mypage = (props) => {
	const [isLogin, setIsLogin] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	return (
		<MypageWrapper>
			{isLogin ? (
				<>
					<MypageHeader title="마이페이지" onClick={toggleDrawer} />
					<MypageSetting isOpen={isOpen} setIsOpen={setIsOpen} />
					<div className="userInfo">
						<div>
							<img src={props.imgURL || "/images/미모티콘.png"} alt="avatar" />
						</div>

						{props.name || "유저이름"}
					</div>
					<ChallengeState />
					<div>
						<NavTitle title="생성한 챌린지" link="/userCreate" />
						<NavTitle title="완료한 챌린지" link="/userComplete" />
					</div>
					<div />
				</>
			) : (
				<>
					<MainHeader />
					<div>로그인 부탁드려요</div>
				</>
			)}

			<Footer />
		</MypageWrapper>
	);
};

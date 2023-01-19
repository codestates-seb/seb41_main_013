import styled, { css } from "styled-components";
import { Btn } from "./Button";
import { NavTitle } from "./NavItem";

export const MypageSetting = (props) => {
	const { menuOpen, setMenuOpen, modalToLogout, modalToQuit } = props;

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<SettingWrapper menuOpen={menuOpen}>
			<Btn
				btnText="close"
				color="white"
				size="2rem"
				width="6rem"
				height="2.2rem"
				background="black"
				onClick={toggleMenu}
			/>
			<div>
				<NavTitle title="프로필 수정" link="/editProfile" width="20rem" />
				<NavTitle title="비밀번호 변경" link="/changePw" width="20rem" />
				<NavTitle title="로그아웃" width="20rem" onClick={modalToLogout} />
				<NavTitle title="회원탈퇴" width="20rem" onClick={modalToQuit} />
			</div>
		</SettingWrapper>
	);
};

const SettingWrapper = styled.div`
	border: 1px solid black;
	padding: 2rem 1.3rem;
	gap: 1rem;
	height: 79.1rem;
	width: 21rem;
	background-color: white;
	transform: translateX(39rem);
	display: none;
	position: absolute;
	${(props) =>
		props.menuOpen &&
		css`
			display: block;
			transform: translateX(7.7rem);
		`}
`;

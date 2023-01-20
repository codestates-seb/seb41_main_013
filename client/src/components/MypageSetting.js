import styled, { css } from "styled-components";
import { Btn } from "./Button";
import { NavTitle } from "./NavItem";
import theme from "./theme";

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
				background={theme.color.green}
				onClick={toggleMenu}
			/>
			<div>
				<NavTitle title="프로필 수정" link="/editProfile" width="100%" />
				<NavTitle title="비밀번호 변경" link="/changePw" width="100%" />
				<NavTitle title="로그아웃" width="100%" onClick={modalToLogout} />
				<NavTitle title="회원탈퇴" width="100%" onClick={modalToQuit} />
			</div>
		</SettingWrapper>
	);
};

const SettingWrapper = styled.div`
	border: 1px solid black;
	padding: 2rem 1.3rem;
	gap: 1rem;
	width: 100%;
	background-color: white;
	display: none;
	position: fixed;
	top: 5.2rem;
	/* display: block; */
	${(props) =>
		props.menuOpen &&
		css`
			display: block;
		`}
`;

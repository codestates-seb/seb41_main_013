import styled, { css } from "styled-components";
import { Btn } from "./Button";
import { NavTitle } from "./NavItem";
import theme from "./theme";

export const MypageSetting = (props) => {
	const { menuOpen, modalToLogout, modalToQuit, onClick } = props;

	return (
		<SettingWrapper menuOpen={menuOpen}>
			<Btn
				btnText="close"
				color="white"
				size="2rem"
				width="6rem"
				height="2.2rem"
				background={theme.color.green}
				onClick={onClick}
			/>
			<div className="div">
				<NavTitle title="프로필 수정" link="/editProfile" />
				<NavTitle title="로그아웃" onClick={modalToLogout} />
				<NavTitle title="회원탈퇴" onClick={modalToQuit} />
			</div>
		</SettingWrapper>
	);
};

const SettingWrapper = styled.div`
	/* border: 1px solid black; */
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	padding: 2rem 1.3rem;
	gap: 1rem;
	width: 100%;
	opacity: 0;
	box-shadow: 0 10px 5px -5px ${theme.color.green};
	background-color: white;
	position: fixed;
	top: 5.2rem;
	transition: all ease-in-out 0.3s;

	${(props) =>
		props.menuOpen &&
		css`
			opacity: 1;
		`}

	.div {
		width: 100%;
	}
`;

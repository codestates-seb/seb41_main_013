import styled, { css } from "styled-components";
import { Btn } from "./Button";
import { NavTitle } from "./NavItem";
import theme from "./theme";

const SettingWrapper = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.3rem;
	gap: 1rem;

	height: 80rem;
	width: 21rem;
	background-color: white;
	transition: all 0.3s ease-in-out;
	transform: translateX(39rem);
	display: none;
	${(props) => {
		if (props.isOpen) {
			return css`
				display: block;
				transform: translateX(7.7rem);
			`;
		}
	}}
	position: absolute;
`;

export const MypageSetting = (props) => {
	const { isOpen, setIsOpen } = props;

	const onClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<SettingWrapper isOpen={isOpen}>
			<Btn
				btnText="close"
				color="white"
				size="2rem"
				width="6rem"
				height="2.2rem"
				background="black"
				onClick={onClick}
			/>
			<div>
				<NavTitle title="프로필 수정" link="/editProfile" width="20rem" />
				<NavTitle title="비밀번호 변경" link="/changePw" width="20rem" />
				<NavTitle title="로그아웃" width="20rem" />
				<NavTitle title="회원탈퇴" width="20rem" />
			</div>
		</SettingWrapper>
	);
};

import styled from "styled-components";
import { Btn } from "./Button";
import { NavTitle } from "./NavItem";

const SettingWrapper = styled.div`
	border: 1px solid black;
	width: 36.4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.3rem;
	gap: 1rem;
`;

export const MypageSetting = () => {
	return (
		<SettingWrapper>
			<Btn btnText="X" color="black" size="0.8rem" width="2rem" height="2rem" />
			<div>
				<NavTitle title="프로필 수정" />
				<NavTitle title="비밀번호 변경" />
				<NavTitle title="로그아웃" />
				<NavTitle title="회원탈퇴" />
			</div>
		</SettingWrapper>
	);
};

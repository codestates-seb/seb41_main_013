import styled from "styled-components";
import { Link } from "react-router-dom";
import { Btn } from "./Button";
import theme from "../components/theme";

export const Logout = () => {
  return (
    <StyledLogout>
			<p>로그인이 필요해요..</p>
			<p>로그인 하러 가기</p>
			<Link to="/login">
					<Btn btnText="클릭" background={theme.color.green} />
			</Link>
		</StyledLogout>
  )
};

const StyledLogout = styled.div`
  display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	gap: 1rem;
	height: 100%;
`;
import styled from "styled-components";
import { Btn } from "./Button";
import { ArrowLeft } from "./NavItem";
import theme from "./theme";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MainHeader = () => {
	const isLogin = useSelector((state) => state.loginStatus.status);

	return (
		<Main>
			<Link to="/">
				<Btn
					btnText="Shall we? Challenge!"
					color={theme.color.green}
					width="11rem"
					height="3.2rem"
					size="1.7rem"
					fontFamily="BMDOHYEON"
				/>
			</Link>
			<div>
				{isLogin ? null : (
					<>
						<Link to="/login">
							<Btn btnText="로그인" color="black" width="6rem" />
						</Link>
						<Link to="/signup">
							<Btn btnText="회원가입" color="black" width="6rem" />
						</Link>
					</>
				)}
			</div>
		</Main>
	);
};

export const TitleHeader = (props) => {
	return (
		<Title>
			<ArrowLeft onClick={props.onClick} />
			{props.title}
			<div />
		</Title>
	);
};

export const MypageHeader = (props) => {
	return (
		<>
			<Title>
				<div />
				{props.title}
				<IoSettingsOutline className="icon" onClick={props.onClick} />
			</Title>
		</>
	);
};

const Main = styled.div`
	/* border-bottom: 1px solid black; */
	background-color: white;
	width: 100%;
	/* max-width: 480px; */
	height: 5.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	padding: 0 1.3rem;
`;

const Title = styled.div`
	/* border: 1px solid black; */
	background-color: white;
	width: 100%;
	/* max-width: 480px; */
	height: 5.2rem;
	font-size: 1.6rem;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	padding: 0 1.3rem;

	.icon {
		font-size: 2rem;
	}
`;

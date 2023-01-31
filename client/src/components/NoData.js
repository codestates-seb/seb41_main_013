import styled from "styled-components";
import { Link } from "react-router-dom";
import { Btn } from "./Button";
import theme from "../components/theme";

export const NoData = () => {
	return (
		<StyledNoData>
			<p>등록된 챌린지가 없습니다.</p>
			<p>챌린지 등록하러 가기</p>
			<Link to="/challenges/create">
				<Btn btnText="클릭" background={theme.color.green} />
			</Link>
		</StyledNoData>
	);
};

export const NoDataDiv = (props) => {
	return (
		<StyledMyChallengeNoData>
			<p>{props.text} 없습니다.</p>
		</StyledMyChallengeNoData>
	);
};

const StyledNoData = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	gap: 1rem;
	height: 100%;
	margin-top: 2.5rem;
`;

const StyledMyChallengeNoData = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	height: 100%;
`;

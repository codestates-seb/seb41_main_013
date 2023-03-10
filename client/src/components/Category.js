import styled from "styled-components";
import town from "../images/town.png";
import exercise from "../images/exercise.png";
import life from "../images/life.png";
import etc from "../images/etc.png";
import theme from "./theme";
import { Btn } from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";

// MainCategory
export const HomeCategory = (props) => {
	return (
		<MainCategoryContainer>
			<Category title="우리동네" src={town} NavTo={`/${props.NavTo}/0`} />
			<Category title="운동" src={exercise} NavTo={`/${props.NavTo}/1`} />
			<Category title="규칙적인 생활" src={life} NavTo={`/${props.NavTo}/2`} />
			<Category title="기타" src={etc} NavTo={`/${props.NavTo}/3`} />
		</MainCategoryContainer>
	);
};

const Category = (props) => {
	return (
		<CategoryItemContainer>
			<Link to={props.NavTo}>
				<img alt="category" src={props.src} />
			</Link>
			{props.title}
		</CategoryItemContainer>
	);
};

// SelectCategory
//props : X
export const SelectCategory = () => {
	const [click, setClick] = useState([false, false, false, false]);

	//클릭하면 카테고리 버튼 색상이 회색 -> 초록색으로
	const handleBtnClick = (num) => {
		let newClick = click.map((el, idx) => idx === num);
		setClick(newClick);
	};

	const SelectCategoryItem = (props) => {
		return (
			<>
				<Btn
					btnText={props.text}
					width={"48%"}
					background={click[props.num] ? theme.color.green : theme.color.gray}
					color={click[props.num] ? theme.color.white : theme.color.navy}
					onClick={() => handleBtnClick(props.num)}
					margin="0.6rem"
				/>
			</>
		);
	};

	return (
		<SelectCategoryContainer>
			<div className="twoCa">
				<SelectCategoryItem num={0} text="우리 동네" />
				<SelectCategoryItem num={1} text="운동" />
			</div>
			<div className="twoCa">
				<SelectCategoryItem num={2} text="규칙적인 생활" />
				<SelectCategoryItem num={3} text="기타" />
			</div>
		</SelectCategoryContainer>
	);
};

const MainCategoryContainer = styled.div`
	border: 1px solid black;
	width: 100%;
	max-width: 480px;
	height: 9.8rem;
	padding: 1rem 0;
	display: flex;
	align-items: center;
	position: fixed;
	top: 5.2rem;
	right: 0;
	left: 0;
	margin: 0 auto;
	/* z-index: 9999; */
	background-color: white;
`;

const CategoryItemContainer = styled.div`
	width: 25%;
	height: 7.8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-size: 1.3rem;
	img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		cursor: pointer;
	}
`;

const SelectCategoryContainer = styled.div`
	width: 100%;
	height: 8.6rem;
	margin-bottom: 1rem;

	display: flex;
	flex-direction: column;
	align-items: center;

	.twoCa {
		width: 100%;
		display: flex;
		flex-direction: row;
	}
`;

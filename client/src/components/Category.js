import styled from "styled-components";
import town from "../images/town.png";
import exercise from "../images/exercise.png";
import life from "../images/life.png";
import etc from "../images/etc.png";
import theme from "./theme";

export const HomeCategory = () => {
	return (
		<MainCategoryContainer>
			<Category title="우리동네" src={town} />
			<Category title="운동" src={exercise} />
			<Category title="규칙적인 생활" src={life} />
			<Category title="기타" src={etc} />
		</MainCategoryContainer>
	);
};

const Category = (props) => {
	return (
		<CategoryItemContainer>
			<img alt="category" src={props.src} />
			{props.title}
		</CategoryItemContainer>
	);
};

const MainCategoryContainer = styled.div`
	border: 1px solid black;
	width: ${theme.width.content};
	height: 5.93rem;
	padding: 0.625rem 0;
	display: flex;
	align-items: center;
`;

const CategoryItemContainer = styled.div`
	width: 5.687rem;
	height: 4.87rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	img {
		width: 3.125rem;
		height: 3.125rem;
		border-radius: 50%;
	}
`;

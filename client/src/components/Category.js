import styled from "styled-components";
import town from "../images/town.png";
import exercise from "../images/exercise.png";
import life from "../images/life.png";
import etc from "../images/etc.png";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import { Btn } from "./Button";

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
	width: 36.4rem;
	height: 9.8rem;
	padding: 1rem 0;
	display: flex;
	align-items: center;
`;

const CategoryItemContainer = styled.div`
	width: 9.1rem;
	height: 7.8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-size: 1.2rem;

	img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
	}
`;
// MainCategory

// SelectCategory

//props : X
const SelectCategory = () => {
	return (
		<ThemeProvider theme={theme}>
			<SelectCategoryContainer>
				<Btn
					btnText={"우리 동네"}
					width={"17.1rem"}
					background={theme.color.gray}
					color={theme.color.navy}
				/>
				<Btn
					btnText={"운동"}
					width={"17.1rem"}
					background={theme.color.gray}
					color={theme.color.navy}
				/>
				<Btn
					btnText={"규칙적인 생활"}
					width={"17.1rem"}
					background={theme.color.gray}
					color={theme.color.navy}
				/>
				<Btn
					btnText={"기타"}
					width={"17.1rem"}
					background={theme.color.gray}
					color={theme.color.navy}
				/>
			</SelectCategoryContainer>
		</ThemeProvider>
	);
};

const SelectCategoryContainer = styled.div`
	width: 36rem;
	height: 8.6rem;
	padding: 0.3rem;
`;

export default SelectCategory;

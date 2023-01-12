// MainCategory

// SelectCategory
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Btn from "./Button";

const SelectCategoryContainer = styled.div`
	width: 36rem;
	height: 8.6rem;
	padding: 0.3rem;
`;

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

export default SelectCategory;

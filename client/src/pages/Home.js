import { HomeCategory } from "../components/Category";
import { Footer } from "../components/Footer";
import { MainHeader } from "../components/Header";
import styled from "styled-components";

export const Home = () => {
	return (
		<Wrapper>
			<MainHeader />
			<HomeCategory />
			<div className="content">challenge</div>
			<Footer />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid black;
	width: 39rem;
	height: 84.4rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.content {
		border: 1px solid red;
		height: 62.9rem;
		width: 36rem;
	}
`;

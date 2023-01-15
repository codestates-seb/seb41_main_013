//커뮤니티 메인 페이지
import theme from "../components/theme";
import styled, { ThemeProvider } from "styled-components";

//components
import PostSummary from "../components/PostSummary";
import { MainHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { HomeCategory } from "../components/Category";

const CommunitycContainer = styled.div``;

const Community = () => {
	return (
		<>
			<MainHeader />
			<HomeCategory />
			{/* input 검색창*/}
			<CommunitycContainer></CommunitycContainer>
			{/* + 버튼*/}
			{/* 위로 이동 버튼*/}
			<Footer />
		</>
	);
};

export default Community;

//커뮤니티 카테고리 선택 후 페이지
import theme from "../components/theme";
import styled, { ThemeProvider } from "styled-components";

//components
import PostSummary from "../components/PostSummary";
import { MainHeader } from "../components/Header";
import { Footer } from "../components/Footer";

const CommunityContainer = styled.div``;

const Community = () => {
	return (
		<>
			<MainHeader />
			{/* input 검색창*/}
			<CommunityContainer></CommunityContainer>
			{/* + 버튼*/}
			{/* 위로 이동 버튼*/}
			<Footer />
		</>
	);
};

export default Community;

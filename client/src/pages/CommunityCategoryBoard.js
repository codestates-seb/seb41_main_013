//커뮤니티 카테고리 선택 후 페이지
import theme from "../components/theme";
import styled, { ThemeProvider } from "styled-components";

//components
import PostSummary from "../components/PostSummary";
import { MainHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { BackToTopBtn, CreateBtn } from "../components/Button";

//dummy
import CommunityList from "../data/dummy";

const CommunityContainer = styled.div``;

const CommunityCategory = (props) => {
	return (
		<>
			<MainHeader />
			{/* input 검색창*/}
			<CommunityContainer>
				{CommunityList.filter((post) => post.category === props.category).map(
					(cpost) => (
						<PostSummary
							title={cpost.title}
							content={cpost.content}
							writer={cpost.writer}
						/>
					),
				)}
			</CommunityContainer>
			<CreateBtn />
			<BackToTopBtn />
			<Footer />
		</>
	);
};

export default CommunityCategory;

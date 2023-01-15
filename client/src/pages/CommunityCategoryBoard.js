//커뮤니티 카테고리 선택 후 페이지
import theme from "../components/theme";
import styled, { ThemeProvider } from "styled-components";

//components
import { PostSummary } from "../components/PostSummary";
import { TitleHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";

//dummy
import { CommunityList } from "../data/dummy";

//props : 카테고리명 - 우리 동네/운동/규칙적인 생활/기타
export const CommunityCategoryBoard = (props) => {
	return (
		<>
			<TitleHeader title={props.category} />
			<SearchInput />
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

const CommunityContainer = styled.div``;

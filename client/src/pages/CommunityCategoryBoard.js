//커뮤니티 카테고리 선택 후 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useParams } from "react-router-dom";

//components
import { PostSummary } from "../components/PostSummary";
import { TitleHeader } from "../components/Header";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";

//dummy
import { CommunityList } from "../data/dummy";

//props : 카테고리명 - 우리 동네/운동/규칙적인 생활/기타
export const CommunityCategoryBoard = () => {
	const { categoryId } = useParams();
	const category = ["우리 동네", "운동", "규칙적인 생활", "기타"];

	return (
		<>
			<TitleHeader title={category[categoryId]} />
			<SearchInput />
			<CommunityContainer>
				{CommunityList.filter((post) => post.categoryId == categoryId).map(
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
		</>
	);
};

const CommunityContainer = styled.div``;

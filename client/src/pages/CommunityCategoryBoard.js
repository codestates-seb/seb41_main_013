//커뮤니티 카테고리 선택 후 페이지
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

			<CommunityContainer>
				<SearchInput />
				{CommunityList.filter((post) => post.categoryId == categoryId).map(
					(cpost) => (
						<PostSummary
							title={cpost.title}
							content={cpost.content}
							writer={cpost.writer}
							postId={cpost.postId}
						/>
					),
				)}
			</CommunityContainer>
			<CreateBtn NavTo="/createPost" />
			<BackToTopBtn />
		</>
	);
};

const CommunityContainer = styled.div`
	margin-top: 5rem;
	margin-bottom: 6.5rem;
`;

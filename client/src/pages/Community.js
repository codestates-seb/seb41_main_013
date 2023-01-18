//커뮤니티 메인 페이지
import theme from "../components/theme";
import styled from "styled-components";

//components
import { PostSummary } from "../components/PostSummary";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import { HomeCategory } from "../components/Category";

//dummy
import { CommunityList } from "../data/dummy";

export const Community = () => {
	return (
		<>
			<CommunitycContainer>
				<HomeCategory />
				<div className="margin">
					<SearchInput />
				</div>
				{CommunityList.map((post) => (
					<div className="margin">
						<PostSummary
							title={post.title}
							content={post.content}
							writer={post.writer}
							postId={post.postId}
						/>
					</div>
				))}
			</CommunitycContainer>
			<CreateBtn />
			<BackToTopBtn />
		</>
	);
};

const CommunitycContainer = styled.div`
	.margin {
		margin-bottom: 1rem;
	}
`;

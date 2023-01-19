//커뮤니티 메인 페이지
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import { PostSummary } from "../components/PostSummary";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import { HomeCategory } from "../components/Category";

//dummy
import { CommunityList } from "../data/dummy";

export const Community = () => {
	const navigate = useNavigate();

	return (
		<>
			<CommunitycContainer>
				<HomeCategory NavTo="community" />
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
			<CreateBtn NavTo="/createPost" />
			<BackToTopBtn />
		</>
	);
};

const CommunitycContainer = styled.div`
	margin-top: 15rem;
	margin-bottom: 6.5rem;
	
	.margin {
		margin-bottom: 1rem;
	}
`;

//커뮤니티 메인 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import { PostSummary } from "../components/PostSummary";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";

//dummy
import { CommunityList } from "../data/dummy";

export const Community = () => {
	return (
		<>
			<CommunitycContainer>
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

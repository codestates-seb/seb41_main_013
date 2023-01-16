//커뮤니티 메인 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

//components
import { PostSummary } from "../components/PostSummary";
import { MainHeader } from "../components/Header";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";

//dummy
import { CommunityList } from "../data/dummy";

export const Community = () => {
	/*const navigate = useNavigate();
	const { postId } = useParams();

	const handlePostClick = () => {
		//각 글의 상세 페이지로 이동
		navigate(`/post/${postId}`);
	};*/

	return (
		<>
			<SearchInput />
			<CommunitycContainer>
				{CommunityList.map((post) => (
					<PostSummary
						title={post.title}
						content={post.content}
						writer={post.writer}
					/>
				))}
			</CommunitycContainer>
			<CreateBtn />
			<BackToTopBtn />
		</>
	);
};

const CommunitycContainer = styled.div``;

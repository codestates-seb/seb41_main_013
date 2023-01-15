//커뮤니티 메인 페이지
import theme from "../components/theme";
import styled, { ThemeProvider } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

//components
import PostSummary from "../components/PostSummary";
import { MainHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { HomeCategory } from "../components/Category";
import { BackToTopBtn, CreateBtn } from "../components/Button";
import { SearchInput } from "../components/SearchInput";

//dummy
import { CommunityList } from "../data/dummy";

const CommunitycContainer = styled.div``;

//PostSummary - props : 글 제목, 글 내용, 아바타 이미지 주소, 작성자 이름, 작성 시각

const Community = () => {
	/*const navigate = useNavigate();
	const { postId } = useParams();

	const handlePostClick = () => {
		//각 글의 상세 페이지로 이동
		navigate(`/postdetail/${postId}`);
	};*/

	return (
		<>
			<MainHeader />
			<HomeCategory />
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
			<Footer />
		</>
	);
};

export default Community;

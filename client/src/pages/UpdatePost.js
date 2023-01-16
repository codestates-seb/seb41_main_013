//글 수정 페이지
import theme from "../components/theme";
import { useParams, useNavigate } from "react-router-dom";
import { CreatepostContainer } from "./CreatePost";

//components
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import { SelectCategory } from "../components/Category";

//dummy
import { CommunityList } from "../data/dummy";

export const UpdatePost = () => {
	const { postId } = useParams();
	const post = CommunityList.filter((el) => el.postId == postId)[0];

	return (
		<>
			<CreatepostContainer>
				<TitleHeader title="글 수정하기" />
				<p>제목</p>
				<Input
					lineHeight="3rem"
					value={post.title}
					fontSize="1.3rem"
					cols="74"
				/>
				<p>내용</p>
				<Input
					lineHeight="1.6rem"
					value={post.content}
					fontSize="1.3rem"
					cols="74"
					rows="10"
				/>
				<p>사진</p>
				<ImageUploader />
				<p>카테고리</p>
				<SelectCategory />
			</CreatepostContainer>
			<Btn
				btnText="완료"
				background={theme.color.green}
				width="36.4rem"
				height="4.8rem"
			/>
		</>
	);
};

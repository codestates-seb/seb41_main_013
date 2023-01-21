//글 수정 페이지
import theme from "../components/theme";
import { useParams, useNavigate } from "react-router-dom";
import { CreatepostContainer } from "./CreatePost";
import { useState } from "react";
import { ErrorContainer } from "./CreatePost";

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
	const navigate = useNavigate();
	const post = CommunityList.filter((el) => el.postId == postId)[0];

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [titleError, setTitleError] = useState(false);
	const [contentError, setContentError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);

	const handleChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleChangeContent = (e) => {
		setContent(e.target.value);
	};
	const handleCheck = (props) => {
		//글 작성/수정 - 유효성 검사 함수
		if (title.length < 5) setTitleError(true);
		else setTitleError(false);
		if (content.length < 20) setContentError(true);
		else setContentError(false);
		if (!titleError && !contentError && !categoryError) {
			//모달 창 ("글 작성을 완료하시겠습니까?")
			navigate(`/community`); //커뮤니티 홈 페이지(또는 카테고리 페이지)로 이동
		}
	};

	return (
		<CreatepostContainer>
			<TitleHeader title="글 수정하기" />
			<p>제목</p>
			<Input
				lineHeight="3rem"
				fontSize="1.3rem"
				value={title}
				onChange={handleChangeTitle}
				borderColor={titleError && theme.color.red}
			/>
			<ErrorContainer display={titleError}>
				제목은 5자 이상이여야 합니다.
			</ErrorContainer>
			<p>내용</p>
			<Input
				lineHeight="1.8rem"
				fontSize="1.3rem"
				rows="20"
				value={content}
				onChange={handleChangeContent}
				borderColor={contentError && theme.color.red}
			/>
			<ErrorContainer display={contentError}>
				내용은 20자 이상이여야 합니다.
			</ErrorContainer>
			<p>사진</p>
			<ImageUploader />
			<p>카테고리</p>
			<SelectCategory />
			<ErrorContainer display={categoryError}>
				1개의 카테고리를 선택해주세요.
			</ErrorContainer>

			<Btn
				btnText="완료"
				background={theme.color.green}
				width="100%"
				height="4.8rem"
				onClick={handleCheck}
				margin="10rem 0.6rem 1rem 0.6rem"
			/>
		</CreatepostContainer>
	);
};

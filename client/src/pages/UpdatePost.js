//글 수정 페이지
import theme from "../components/theme";
import { useParams, useNavigate } from "react-router-dom";
import { CreatepostContainer } from "./CreatePost";
import { useState } from "react";
import { ErrorContainer } from "./CreatePost";
import axios from "axios";

//components
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import { SelectCategory } from "../components/Category";
import { TwoBtnModal } from "../components/Modal";

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
	const [createModal, setCreateModal] = useState(false);
	const [value, setValue] = useState(-1); //카테고리 번호
	const category = ["우리동네", "운동", "규칙적인 생활", "기타"];
	const token = null;

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
		if (value === -1) setCategoryError(true);
		else setCategoryError(false);
		if (
			titleError === false &&
			contentError === false &&
			categoryError === false &&
			value !== -1
		) {
			//에러가 하나도 없을 경우
			setCreateModal(true);
		}
	};

	const postBody = JSON.stringify({
		boardImageId: 0,
		category: category[value],
		content: content,
		memberId: 0,
		title: title,
	});
	const handleUpdatePost = async () => {
		//글 등록 함수
		try {
			const response = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/boards`,
				postBody,
				{
					headers: { "Content-Type": "application/json", Authorization: token },
				},
			);
			if (response.status === 200) {
				navigate("/community");
			}
		} catch (error) {
			console.error(error);
		}
	};
	const handleChangeValue = (n) => {
		setValue(n);
	};

	return (
		<CreatepostContainer>
			{createModal && (
				<TwoBtnModal
					modalText="글 작성을 완료하시겠습니까?"
					btnTextOrg="완료"
					onClickOrg={handleUpdatePost}
					btnTextGry="취소"
					onClickGry={() => setCreateModal(false)}
				/>
			)}
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
			<SelectCategory onClick={handleChangeValue} />
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

//글 수정 페이지
import theme from "../components/theme";
import { useParams, useNavigate } from "react-router-dom";
import { CreatepostContainer } from "./CreatePost";
import { useState, useEffect } from "react";
import { ErrorContainer } from "./CreatePost";
import axios from "axios";
import { useSelector } from "react-redux";

//components
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import { SelectCategory } from "../components/Category";
import { TwoBtnModal } from "../components/Modal";

export const UpdatePost = () => {
	const { boardId } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({});

	useEffect(() => {
		getPost();
	}, []);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [contentError, setContentError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [value, setValue] = useState(-1); //카테고리 번호
	const category = ["우리동네", "운동", "생활습관", "기타"];
	let categoryId;

	//유저 정보
	const accessToken = localStorage.getItem("authorization");

	const getPost = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/boards/${boardId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);

			if (response.status === 200) {
				setPost(response.data.data);
				setTitle(response.data.data.title);
				setContent(response.data.data.content);
				categoryId = response.data.data.category;
			}
		} catch (error) {
			console.error(error);
		}
	};

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
		if (title.length >= 5 && content.length >= 20 && value !== -1) {
			//에러가 하나도 없을 경우
			setCreateModal(true);
		}
	};

	const handleUpdatePost = async () => {
		//글 수정 후 등록 함수
		try {
			const response = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/boards/${boardId}`,
				{
					boardId: boardId,
					category: category[value],
					content: content,
					title: title,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
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
			<SelectCategory onClick={handleChangeValue} category={categoryId} />
			<ErrorContainer display={categoryError}>
				1개의 카테고리를 선택해주세요.
			</ErrorContainer>
			<Btn
				btnText="완료"
				background={theme.color.green}
				width="98.3%"
				height="4.8rem"
				onClick={handleCheck}
				margin="10rem 0.6rem 1rem 0.6rem"
			/>
		</CreatepostContainer>
	);
};

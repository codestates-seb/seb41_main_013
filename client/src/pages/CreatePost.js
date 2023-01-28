//글 수정 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

//import { handleCheck } from "../function/postFunction";

//components
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import { SelectCategory } from "../components/Category";
import { TwoBtnModal } from "../components/Modal";

export const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [contentError, setContentError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [value, setValue] = useState(-1); //카테고리 번호
	const navigate = useNavigate();
	const category = ["우리동네", "운동", "규칙적인 생활", "기타"];
	const token = null;

	const handleChangeValue = (n) => {
		setValue(n);
	};
	const handleChangeTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleChangeContent = (e) => {
		setContent(e.target.value);
	};

	const postBody = JSON.stringify({
		boardImageId: 0,
		category: category[value],
		content: content,
		memberId: 0,
		title: title,
	});
	const handleCreatePost = async () => {
		//글 등록 함수
		try {
			const response = await axios.post(
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

	const handleCheck = () => {
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
			title !== "" &&
			content !== "" &&
			value !== -1
		) {
			//에러가 하나도 없을 경우
			setCreateModal(true);
		}
	};

	return (
		<CreatepostContainer>
			{createModal && (
				<TwoBtnModal
					modalText="글 작성을 완료하시겠습니까?"
					btnTextOrg="완료"
					onClickOrg={handleCreatePost}
					btnTextGry="취소"
					onClickGry={() => setCreateModal(false)}
				/>
			)}
			<TitleHeader title="글 작성하기" />
			<p>제목</p>
			<Input
				lineHeight="3rem"
				placeholder="제목을 입력하세요"
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
				placeholder="내용을 입력하세요"
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
			<div className="btn">
				<Btn
					btnText="완료"
					background={theme.color.green}
					width="98.3%"
					height="4.8rem"
					onClick={handleCheck}
					margin="10rem 0.6rem 1rem 0.6rem"
				/>
			</div>
		</CreatepostContainer>
	);
};

export const CreatepostContainer = styled.div`
	margin-top: 5.5rem;
	margin-bottom: 6.5rem;
	overflow-y: scroll;
	height: 66rem;

	::-webkit-scrollbar {
		display: none;
	}
	p {
		font-family: "Inter";
		font-style: normal;
		font-weight: 600;
		font-size: 1.4rem;
		line-height: 3rem;
		display: flex;
		align-items: center;
	}
`;

export const ErrorContainer = styled.strong`
	display: ${(props) => (props.display ? "block" : "none")};
	color: ${theme.color.red};
`;

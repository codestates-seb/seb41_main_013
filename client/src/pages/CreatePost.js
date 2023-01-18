//글 수정 페이지
import theme from "../components/theme";
import styled, { ThemeContext } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
//import { handleCheck } from "../function/postFunction";

//components
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import { SelectCategory } from "../components/Category";

export const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
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
	};

	return (
		<>
			<CreatepostContainer>
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
				<SelectCategory />
				<ErrorContainer display={categoryError}>
					1개의 카테고리를 선택해주세요.
				</ErrorContainer>
			</CreatepostContainer>

			<Btn
				btnText="완료"
				background={theme.color.green}
				width="36.4rem"
				height="4.8rem"
				onClick={handleCheck}
			/>
		</>
	);
};

export const CreatepostContainer = styled.div`
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

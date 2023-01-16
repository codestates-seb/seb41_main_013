//글 수정 페이지
import theme from "../components/theme";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

//components
import { TitleHeader } from "../components/Header";
import { ImageUploader } from "../components/ImageUploader";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import { SelectCategory } from "../components/Category";

//dummy
import { CommunityList } from "../data/dummy";
import { useState } from "react";

export const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const handleSubmitClick = () => {
		//유효성 검사 함수
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
					cols="74"
				/>
				<p>내용</p>
				<Input
					lineHeight="1.6rem"
					placeholder="내용을 입력하세요"
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
				onClick={handleSubmitClick}
			/>
		</>
	);
};

const CreatepostContainer = styled.div`
	p {
		font-family: "Inter";
		font-style: normal;
		font-weight: 600;
		font-size: 1.4rem;
		line-height: 1.7rem;
		display: flex;
		align-items: center;
	}
`;

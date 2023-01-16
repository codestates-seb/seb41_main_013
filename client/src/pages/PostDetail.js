//글 상세 조회 페이지
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

export const PostDetail = () => {
	return (
		<>
			<PostDetailContainer>
				<TitleHeader title="글 작성하기" />
			</PostDetailContainer>
		</>
	);
};

const PostDetailContainer = styled.div``;

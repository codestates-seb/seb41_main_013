import styled from "styled-components";
import { TitleHeader } from "../components/Header";
import { TwoBtnModal } from "../components/Modal";
import { Input } from "../components/Input";
import { ImageUploader } from "../components/ImageUploader";
import { Btn } from "../components/Button";
import theme from "../components/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getLoginUser } from "../redux/userSlice";

const CreateChallenge = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		setError,
	} = useForm({
		defaultValues: {
			startAt: null,
			endAt: null,
			snapshotStartAt: null,
			snapshotEndAt: null,
		},
	});
	const [twoBtnModalVisible, setTwoBtnModalVisible] = useState(false);
	const [cancelModalVisible, setCancelModalVisible] = useState(false);
	const [image, setImage] = useState(null);

	const { loginUserInfo } = useSelector((state) => state.loginUserInfo);
	const accessToken = localStorage.getItem("authorization");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const categoryId = {
		우리동네: "0",
		운동: "1",
		생활습관: "2",
		기타: "3",
	};
	const today = new Date();

	const onSubmit = async (data) => {
		const {
			title,
			category,
			startAt,
			endAt,
			frequency,
			snapshotStartAt,
			snapshotEndAt,
			content,
		} = data;

		const formData = new FormData();
		formData.append("file", image);
		
		try {
				const presignedUrlResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${accessToken}`,
						}
					});
	
				if (presignedUrlResponse.status === 200) {
					const startHour =
					`${snapshotStartAt.$H}`.length === 1
					? `0${snapshotStartAt.$H}`
					: `${snapshotStartAt.$H}`;
					const startMinute =
					`${snapshotStartAt.$m}`.length === 1
					? `0${snapshotStartAt.$m}`
					: `${snapshotStartAt.$m}`;
					const endHour =
					`${snapshotEndAt.$H}`.length === 1
					? `0${snapshotEndAt.$H}`
					: `${snapshotEndAt.$H}`;
					const endMinute =
					`${snapshotEndAt.$m}`.length === 1
					? `0${snapshotEndAt.$m}`
					: `${snapshotEndAt.$m}`;

			const payload = {
				category: category,
				challengeImageId: presignedUrlResponse.data.imageId,
				content: content,
				endAt: endAt,
				frequency: frequency,
				hostMemberId: loginUserInfo.memberId,
				snapshotEndAt: `${endHour}:${endMinute}`,
				snapshotStartAt: `${startHour}:${startMinute}`,
				startAt: startAt,
				title: title,
			};

			const response2 = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/api/challenges`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				},
			);
			if (response2.status === 201) {
				dispatch(
					getLoginUser({
						...loginUserInfo,
						hostMemberId: response2.data.hostmemberId,
					}),
				);
				navigate(`/challenges/${categoryId[category]}`);
			}
				}
		} catch (error) {
			console.error(error);
		}
	};

	const formSubmit = () => {
		if (Object.keys(errors).length === 0) {
			setTwoBtnModalVisible(true);
		}
	};

	return (
		<StyledForm onSubmit={handleSubmit(formSubmit)}>
			<TitleHeader
				title="챌린지 생성하기"
				onClick={() => setCancelModalVisible(true)}
			/>
			<WrapperContainer>
				<Wrapper>
					<Input
						label="제목"
						placeholder="챌린지 제목을 입력해주세요"
						name="title"
						register={register("title", { required: "제목을 입력해주세요." })}
						borderColor={errors.title ? theme.color.red : ""}
					/>
					{errors.title && <p>{errors.title.message}</p>}
				</Wrapper>
				<Wrapper>
					<Label>카테고리</Label>
					<BtnWrapper borderColor={errors.category?.message && theme.color.red}>
						{["우리동네", "운동", "생활습관", "기타"].map((el, idx) => (
							<StyledBtn
								key={idx}
								type="button"
								onClick={() => {
									setValue("category", el);
									setError("category", null);
								}}
								className={`${el === watch("category") ? "selected" : ""}`}
								value={el}
								register={register("category", {
									required: "카테고리를 선택해주세요.",
								})}
								width="49%"
							>
								{el}
							</StyledBtn>
						))}
					</BtnWrapper>
					{errors.category && <p>{errors.category.message}</p>}
				</Wrapper>
				<Wrapper>
					<Label>사진</Label>
					<ImageUploader 
						width="9rem"
						height="9rem"
						name="img"
						onImageChange={(img) => setImage(img)}
					/>
				</Wrapper>
				<Wrapper>
					<Label>기간</Label>
					<PickersWrapper>
						<DatePickers
							name="startAt"
							register={register("startAt", {
								required: "시작 날짜를 선택해주세요.",
							})}
							onDateChange={(date) => {
								const month =
									`${date.$d.getMonth() + 1}`.length === 1
										? `0${date.$d.getMonth() + 1}`
										: `${date.$d.getMonth() + 1}`;
								const day =
									`${date.$D}`.length === 1 ? `0${date.$D}` : `${date.$D}`;
								setValue("startAt", `${date.$y}-${month}-${day}`);
							}}
							minDate={today}
						/>
						<DatePickers
							name="endAt"
							register={register("endAt", {
								required: "종료 날짜를 선택해주세요.",
							})}
							startAt={watch("startAt")}
							onDateChange={(date) => {
								const month =
									`${date.$d.getMonth() + 1}`.length === 1
										? `0${date.$d.getMonth() + 1}`
										: `${date.$d.getMonth() + 1}`;
								const day =
									`${date.$D}`.length === 1 ? `0${date.$D}` : `${date.$D}`;
								setValue("endAt", `${date.$y}-${month}-${day}`);
							}}
							minDate={watch("startAt")}
						/>
					</PickersWrapper>
					{errors.startAt && <p>{errors.startAt.message}</p>}
					{errors.endAt && <p>{errors.endAt.message}</p>}
				</Wrapper>
				<Wrapper>
					<Label>빈도</Label>
					<BtnWrapper
						borderColor={errors.frequency?.message && theme.color.red}
					>
						{["매일", "주1회", "주2회", "주3회", "주4회", "주5회", "주6회"].map(
							(el, idx) => (
								<StyledBtn
									key={idx}
									type="button"
									onClick={() => {
										setValue("frequency", el);
										setError("frequency", null);
									}}
									className={`${el === watch("frequency") ? "selected" : ""}`}
									value={el}
									register={register("frequency", {
										required: "빈도를 선택해주세요.",
									})}
									width="15%"
								>
									{el}
								</StyledBtn>
							),
						)}
					</BtnWrapper>
					{errors.frequency && <p>{errors.frequency.message}</p>}
				</Wrapper>
				<Wrapper>
					<Label>인증시간</Label>
					<PickersWrapper>
						<TimePickers
							name="snapshotStartAt"
							register={register("snapshotStartAt", {
								required: "인증 시작 시간을 선택해주세요.",
							})}
							onTimeChange={(time) => {
								setValue("snapshotStartAt", time);
							}}
						/>
						<TimePickers
							name="snapshotEndAt"
							register={register("snapshotEndAt", {
								required: "인증 종료 시간을 선택해주세요.",
							})}
							snapshotStartAt={watch("snapshotStartAt")}
							onTimeChange={(time) => {
								setValue("snapshotEndAt", time);
							}}
							minTime={watch("snapshotStartAt")}
						/>
					</PickersWrapper>
					{errors.snapshotStartAt && <p>{errors.snapshotStartAt.message}</p>}
					{errors.snapshotEndAt && <p>{errors.snapshotEndAt.message}</p>}
				</Wrapper>
				<Wrapper>
					<Input
						label="챌린지 소개"
						placeholder="인증방법을 포함하여 챌린지에 대한 소개를 작성해주세요"
						rows="12"
						name="content"
						register={register("content", {
							required: "챌린지 소개를 작성해주세요.",
						})}
						borderColor={errors.content ? theme.color.red : ""}
					/>
					{errors.content && <p>{errors.content.message}</p>}
				</Wrapper>
				<Wrapper>
					<Label>유의사항</Label>
					<div>챌린지를 등록하면 수정하실 수 없습니다.</div>
					<div>
						또한, 아직 시작되지 않았거나 참여자가 없는 경우에만 삭제 가능합니다.
					</div>
				</Wrapper>
				<Btn
					background={theme.color.green}
					width="100%"
					height="4.8rem"
					fontWeight="700"
					size="1.4rem"
					btnText="등록하기"
					margin="0 0 1.3rem 0"
					type="submit"
				/>
			</WrapperContainer>
			{cancelModalVisible && (
				<TwoBtnModal
					modalText="작성을 취소하시겠습니까?"
					btnTextOrg="네"
					btnTextGry="아니요"
					onClickOrg={() => navigate("/mychallenge")}
					onClickGry={() => setCancelModalVisible(false)}
				/>
			)}
			{twoBtnModalVisible && (
				<TwoBtnModal
					modalText="등록하시겠습니까?"
					btnTextOrg="확인"
					btnTextGry="취소"
					onClickOrg={handleSubmit(onSubmit)}
					onClickGry={() => setTwoBtnModalVisible(false)}
				/>
			)}
		</StyledForm>
	);
};

const DatePickers = (props) => {
	const [date, setDate] = useState(null);

	const handleDateChange = (e) => {
		setDate(e);
		if (props.onDateChange) {
			props.onDateChange(e);
		}
	};

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<StyledDatePicker
					inputFormat="YYYY-MM-DD"
					value={date}
					onChange={handleDateChange}
					renderInput={(params) => (
						<TextField {...params} {...props.register} />
					)}
					minDate={props.minDate}
				/>
			</LocalizationProvider>
		</>
	);
};

const TimePickers = (props) => {
	const [time, setTime] = useState(null);

	const handleTimeChange = (e) => {
		setTime(e);
		if (props.onTimeChange) {
			props.onTimeChange(e);
		}
	};

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<StyledTimePicker
					inputFormat="HH:mm"
					value={time}
					onChange={handleTimeChange}
					renderInput={(params) => (
						<TextField {...params} {...props.register} />
					)}
					minTime={props.minTime}
				/>
			</LocalizationProvider>
		</>
	);
};

const StyledForm = styled.form`
	& p {
		color: ${theme.color.red};
		font-size: 1rem;
	}
`;

const WrapperContainer = styled.div`
	position: absolute;
	left: 0;
	top: 5.2rem;
	bottom: 0;
	overflow-y: scroll;
	width: 100%;
	padding: 0 1.3rem;

	::-webkit-scrollbar {
		display: none;
	}
`;

const StyledBtn = styled.button`
	width: ${(props) => props.width};
	height: 3.6rem;
	border: none;
	border-radius: 1.2rem;
	background-color: ${theme.color.gray};
	font-size: 1.3rem;
	color: ${theme.color.navy};
	cursor: pointer;

	&.selected {
		background-color: ${theme.color.green};
		color: white;
	}
`;

const StyledTimePicker = styled(TimePicker)`
	width: 49%;

	& > div {
		font-size: 1.3rem;
		height: 4rem;
	}
`;

const StyledDatePicker = styled(DatePicker)`
	width: 49%;

	& > div {
		font-size: 1.3rem;
		height: 4rem;
	}
`;

const PickersWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Wrapper = styled.div`
	margin-bottom: 1rem;
`;

const Label = styled.div`
	font-size: 1.4rem;
	line-height: 3rem;
`;

const BtnWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.6rem;
	padding: 0.2rem;
	border: 0.1rem solid ${(props) => props.borderColor || "transparent"};
	border-radius: 0.8rem;
`;

export default CreateChallenge;

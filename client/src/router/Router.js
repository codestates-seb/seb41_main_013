import { Routes, Route, Outlet } from "react-router-dom";
// import { Suspense } from "react";
// import { Loading } from "../components/Loading";
import { Footer } from "../components/Footer";
import { MainHeader } from "../components/Header";
// import {
//   Home,
//   MyChallenge,
//   MyPage,
//   UserCreateChallenge,
//   UserCompleteChallenge,
//   UserPasswordChange,
//   UserProfileEdit
// } from "../pages";
import Home from "../pages/Home";
import HomeCategoryBoard from "../pages/HomeCategoryBoard";
import ChallengeDetail from "../pages/ChallengeDetail";
import CreateChallenge from "../pages/CreateChallenge";
import MyChallenge from "../pages/MyChallenge";
import MyChallengeUpload from "../pages/MyChallengeUpload";
import MyChallengeOthers from "../pages/MyChallengeOthers";
import { MyPage } from "../pages/MyPage";
import { UserCreateChallenge } from "../pages/UserCreateChallenge";
import { UserCompleteChallenge } from "../pages/UserCompleteChallenge";
import { UserPasswordChange } from "../pages/UserPasswordChange";
import { UserProfileEdit } from "../pages/UserProfileEdit";
import { Signup } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { FindPassword } from "../pages/FindPassword";
//community
import { Community } from "../pages/Community";
import { CommunityCategoryBoard } from "../pages/CommunityCategoryBoard";
import { CreatePost } from "../pages/CreatePost";
import { UpdatePost } from "../pages/UpdatePost";
import { PostDetail } from "../pages/PostDetail";

const Overlaps = () => {
	return (
		<>
			<MainHeader />
			<Outlet />
			<Footer />
		</>
	);
};

const OverlapEmp = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

const OverlapFoo = () => {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
};

const OverlapHead = () => {
	return (
		<>
			<MainHeader />
			<Outlet />
		</>
	);
};

export const OurPath = () => {
	return (
		// <Suspense fallback={<Loading />}>
		<Routes>
			{/* 아무것도 고정 안 된 빈 페이지  */}
			<Route element={<OverlapEmp />}>
				<Route path="/userCreate" element={<UserCreateChallenge />} />
				<Route path="/userComplete" element={<UserCompleteChallenge />} />
				<Route path="/changePw" element={<UserPasswordChange />} />
				<Route path="/editProfile" element={<UserProfileEdit />} />
				<Route path="/" element={<Home />} />
				<Route path="/challenges/:categoryId" element={<HomeCategoryBoard />} />
				<Route
					path="/challenges/:categoryId/:challengeId"
					element={<ChallengeDetail />}
				/>
				<Route path="/challenges/create" element={<CreateChallenge />} />
				<Route path="/mychallenge" element={<MyChallenge />} />
				<Route
					path="/mychallenge/:challengeId/upload"
					element={<MyChallengeUpload />}
				/>
				<Route
					path="/mychallenge/:challengeId/others"
					element={<MyChallengeOthers />}
				/>
			</Route>
			{/* header + footer 고정된 페이지 */}
			<Route element={<Overlaps />}>
				{/* 마이페이지
            커뮤니티 */}
				<Route path="/community" element={<Community />} />
			</Route>
			{/* footer 고정된 페이지 */}
			<Route element={<OverlapFoo />}>
				<Route path="/mypage" element={<MyPage />} />
				<Route
					path="/community/:categoryId"
					element={<CommunityCategoryBoard />}
				/>
				<Route path="/createPost" element={<CreatePost />} />
				<Route path="/post/:postId/update" element={<UpdatePost />} />
				<Route path="/post/:postId" element={<PostDetail />} />
			</Route>
			{/* header 고정된 페이지 */}
			<Route element={<OverlapHead />}>
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/findPw" element={<FindPassword />} />
			</Route>
		</Routes>
		// </Suspense>
	);
};

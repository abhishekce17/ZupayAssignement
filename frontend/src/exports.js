import React, { lazy, Suspense } from "react";
import Home from "./pages/home";
import DefaultLoadSkeleton from "./components/Default-Load-Skeleton";
import PostLoadSkeleton from "./components/Post-Load-Skeleton";
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
// const Home = lazy(() => import("./pages/home"));
const AccountSetting = lazy(() => import("./pages/account-setting"));
const AddPost = lazy(() => import("./pages/add-post"));
const Post = lazy(() => import("./pages/post"));
const SearchPost = lazy(() => import("./pages/search-post"));
const EditPost = lazy(() => import("./pages/edit-post"));
const YourPost = lazy(() => import("./pages/your-post"));
const FollowingPost = lazy(() => import("./pages/following-post"));

export const LoginPage = () => {
    return (
        <Suspense fallback={<DefaultLoadSkeleton />} ><Login /></Suspense>
    )
}
export const RegisterPage = () => {
    return (
        <Suspense fallback={<DefaultLoadSkeleton />} ><Register /></Suspense>
    )
}
export const AccountSettingPage = () => {
    return (
        <Suspense fallback={<DefaultLoadSkeleton />} ><AccountSetting /></Suspense>
    )
}
export const HomePage = () => {
    return (
        <Home />
    )
}
export const AddPostPage = () => {
    return (
        <Suspense fallback={<DefaultLoadSkeleton />} ><AddPost /></Suspense>
    )
}
export const PostPage = () => {
    return (
        <Suspense fallback={<DefaultLoadSkeleton />} ><Post /></Suspense>
    )
}
export const SearchPostPage = () => {
    return (
        <Suspense fallback={<PostLoadSkeleton />} ><SearchPost /></Suspense>
    )
}
export const EditPostPage = () => {
    return (
        <Suspense fallback={<DefaultLoadSkeleton />} ><EditPost /></Suspense>
    )
}
export const YourPostPage = () => {
    return (
        <Suspense fallback={<PostLoadSkeleton />} ><YourPost /></Suspense>
    )
}
export const FollowingPostPage = () => {
    return (
        <Suspense fallback={<PostLoadSkeleton />} ><FollowingPost /></Suspense>
    )
}




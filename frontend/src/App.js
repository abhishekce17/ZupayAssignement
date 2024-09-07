import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/Header";
import PostLoadSkeleton from "./components/Post-Load-Skeleton";
import { Toaster } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import { userAtom, userFollowingAtom, userPostsAtom } from "./stores/atoms/user";
import { AccountSettingPage, AddPostPage, EditPostPage, FollowingPostPage, HomePage, LoginPage, PostPage, RegisterPage, SearchPostPage, YourPostPage } from "./exports";


function App() {
  const setUser = useSetRecoilState(userAtom);
  const setUsersPost = useSetRecoilState(userPostsAtom);
  const setUsersFollowing = useSetRecoilState(userFollowingAtom);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["authToken"]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const request = await fetch("https://zupay-assignement-backend.vercel.app/api/v1/user", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${cookies.authToken}`
        }
      })
      if (request.status === 200) {
        const { _id, name, username, email, posts, following } = await request.json();
        setUser({
          userId: _id,
          name: name,
          username: username,
          email: email
        });
        setUsersPost(posts);
        setUsersFollowing(following);
      }
      setLoading(false);
    }
    if (cookies.authToken) {
      fetchUserInfo()
    }
  }, [cookies.authToken])

  return (
    <div className="App border-spacing-0 border-t-4 border-primary h-screen">
      <main className="h-full flex  flex-col" >
        <BrowserRouter>
          <Toaster />
          <section className="header" >
            <Header />
          </section>
          <section className="flex h-[calc(100%-67px)] flex-col md:flex-row">
            <section className=" sticky bottom-0 md:block order-last md:order-first bg-white" >
              <Sidebar />
            </section>
            <section className="bg-custom-lightest-gray flex-grow rounded-t-xl md:rounded-none md:rounded-ss-xl p-2 sm:p-6 overflow-y-scroll no-scrollbar" >
              {loading ? <PostLoadSkeleton /> :
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<AccountSettingPage />} />
                  <Route path="/search" element={<SearchPostPage />} />
                  <Route path="/following" element={<FollowingPostPage />} />
                  <Route path="/post/*" element={<PostPage />} />
                  <Route path="/your-post" element={<YourPostPage />} />
                  <Route path="/your-post/edit-post/*" element={<EditPostPage />} />
                  <Route path="/your-post/add-post" element={<AddPostPage />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              }
            </section>
          </section>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

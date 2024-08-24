import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { lazy, Suspense } from "react";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/Header";
import PostLoadSkeleton from "./components/Post-Load-Skeleton";
import DefaultLoadSkeleton from "./components/Default-Load-Skeleton";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Home = lazy(() => import("./pages/home"));
const AccountSetting = lazy(() => import("./pages/account-setting"));
const AddPost = lazy(() => import("./pages/add-post"));
const Post = lazy(() => import("./pages/post"));
const SearchPost = lazy(() => import("./pages/search-post"));
const EditPost = lazy(() => import("./pages/edit-post"));
const YourPost = lazy(() => import("./pages/your-post"));
const FollowingPost = lazy(() => import("./pages/following-post"));

function App() {
  return (
    <div className="App border-spacing-0 border-t-4 border-primary h-screen">
      <main className="h-full flex  flex-col" >
        <BrowserRouter>
          <section className="header" >
            <Header />
          </section>
          <section className="flex h-[calc(100%-67px)] flex-col md:flex-row">
            <section className=" sticky bottom-0 md:block order-last md:order-first bg-white" >
              <Sidebar />
            </section>
            <section className="bg-custom-lightest-gray flex-grow rounded-t-xl md:rounded-none md:rounded-ss-xl p-4 md:p-6 overflow-y-scroll no-scrollbar" >
              <Routes>
                <Route path="/" element={<Suspense fallback={<PostLoadSkeleton />} > <Home /> </Suspense>} />
                <Route path="/login" element={<Suspense fallback={<DefaultLoadSkeleton />} ><Login /></Suspense>} />
                <Route path="/register" element={<Suspense fallback={<DefaultLoadSkeleton />} ><Register /></Suspense>} />
                <Route path="/profile" element={<Suspense fallback={<DefaultLoadSkeleton />} ><AccountSetting /></Suspense>} />
                <Route path="/search" element={<Suspense fallback={"Loading"} ><SearchPost /></Suspense>} />
                <Route path="/following" element={<Suspense fallback={<PostLoadSkeleton />} ><FollowingPost /></Suspense>} />
                <Route path="/post" element={<Suspense fallback={"Loading"} ><Post /></Suspense>} />
                <Route path="/your-post" element={<Suspense fallback={<PostLoadSkeleton />} ><YourPost /></Suspense>} />
                <Route path="/your-post/edit-post" element={<Suspense fallback={"Loading"} ><EditPost /></Suspense>} />
                <Route path="/your-post/add-post" element={<Suspense fallback={"Loading"} ><AddPost /></Suspense>} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </section>
          </section>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

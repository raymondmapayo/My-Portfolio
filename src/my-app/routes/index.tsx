import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Lazy load pages
const Lay = lazy(() => import("@/module/Projects/list/LayoutList/Lists"));
const Resume = lazy(() => import("@/module/Home/Resume"));
const BlogsSinglePage = lazy(() => import("@/module/Blogs/list/BlogList"));
const Loader = lazy(() => import("@/components/Loader/Loader"));
const SidebarLayout = lazy(() => import("@/components/Sidebar/Sidebar"));
const AboutMeLayout = lazy(
  () => import("@/Pages/AboutMeLayouts/AboutMeLayout")
);
const AchievementLayouts = lazy(
  () => import("@/Pages/AchievementLayouts/AchievementLayout")
);
const ProjectLayouts = lazy(
  () => import("@/Pages/MyProjectLayouts/MyprojectLayout")
);
const BlogLayouts = lazy(() => import("@/Pages/Blogs/BlogLayout"));
const HomeLayout = lazy(() => import("@/Pages/HomeLayouts/HomeLayout"));
const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SidebarLayout />}>
            <Route index element={<HomeLayout />} />
            <Route path="about_me" element={<AboutMeLayout />} />
            <Route path="home" element={<HomeLayout />} />
            <Route path="myachievements" element={<AchievementLayouts />} />
            <Route path="myprojects" element={<ProjectLayouts />} />
            <Route path="myblog" element={<BlogLayouts />} />
            <Route path="myblog/:id" element={<BlogsSinglePage />} />
            <Route path="myprojects/:title" element={<Lay />} />
            <Route path="resume" element={<Resume />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

import GitinTouch from "@/module/Home/GitinTouch";
import MyContribution from "../../MyContribution";
import OthersProject from "../OthersProject";
import ProjectSinglePage from "../ProjectSinglePage";

const ProjectLayout = () => {
  return (
    <div className="rounded-2xl bg-[#E6FAFD] dark:bg-gray-800 p-4 flex-1 min-w-[130px]  flex flex-col xl:flex-row gap-6 transition-colors duration-300">
      {/* Left Side */}
      <div className="w-full xl:w-[70%] flex flex-col gap-4">
        <ProjectSinglePage />
      </div>
      {/* Right Side (Optional) */}
      <div className="w-full xl:w-[30%] flex flex-col gap-4">
        <MyContribution />
        <OthersProject />
        <GitinTouch />
      </div>
    </div>
  );
};

export default ProjectLayout;

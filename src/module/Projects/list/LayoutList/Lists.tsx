import GitinTouch from "@/module/Home/GitinTouch";
import MyContribution from "../../MyContribution";
import OthersProject from "../OthersProject";
import ProjectSinglePage from "../ProjectSinglePage";

const ProjectLayout = () => {
  return (
    <div
      className="
        w-full
        bg-[#E6FAFD] dark:bg-gray-800
        transition-colors duration-300

        /* always square, no radius */
        rounded-none

        /* layout padding */
        p-0 xl:p-4

        /* layout structure */
        flex-1 flex flex-col xl:flex-row gap-6
        min-h-screen overflow-y-auto
      "
    >
      {/* Left Side */}
      <div className="w-full xl:w-[70%] flex flex-col gap-4">
        <ProjectSinglePage />
      </div>

      {/* Right Side */}
      <div className="w-full xl:w-[30%] flex flex-col gap-4">
        <MyContribution />
        <OthersProject />
        <GitinTouch />
      </div>
    </div>
  );
};

export default ProjectLayout;

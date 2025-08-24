import CreatedProject from "@/module/Projects/CreatedProject";
import MyContribution from "@/module/Projects/MyContribution";
import MyProject from "@/module/Projects/MyProject";

const MyprojectLayout = () => {
  return (
    <div className="flex-1 flex flex-col p-4 gap-4 bg-[#E6FAFD] dark:bg-gray-800 min-h-screen overflow-y-auto rounded-2xl transition-colors duration-300">
      {/* Left Side */}
      <div className="flex-1 w-full flex flex-col gap-4">
        <MyContribution />
        <MyProject />
        <CreatedProject /> {/* White card now fully visible */}
      </div>
    </div>
  );
};

export default MyprojectLayout;

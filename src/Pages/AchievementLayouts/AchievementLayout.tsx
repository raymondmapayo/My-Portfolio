import Achievements from "@/module/Achievement/Achievements";

const MyAchievements = () => {
  return (
    <div className="rounded-2xl bg-[#E6FAFD] dark:bg-gray-800 p-4 flex-1 min-w-[130px] flex flex-col xl:flex-row gap-4 transition-colors duration-300">
      {/* Left Side */}
      <div className="flex-1 w-full flex flex-col gap-4">
        {/* Removed 700% */}
        <Achievements />
      </div>
      {/* Right Side (Optional) */}
    </div>
  );
};

export default MyAchievements;

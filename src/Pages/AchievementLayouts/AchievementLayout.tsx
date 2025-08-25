import Achievements from "@/module/Achievement/Achievements";

const MyAchievements = () => {
  return (
    <div
      className={`
        w-full h-auto
        flex flex-col gap-4
        transition-colors duration-300
        bg-[#E6FAFD] dark:bg-gray-800
        p-0 xl:p-4
        rounded-none xl:rounded-2xl
        flex-1 min-w-[130px]
      `}
    >
      {/* Left Side */}
      <div className="flex-1 w-full flex flex-col gap-4">
        <Achievements />
      </div>
    </div>
  );
};

export default MyAchievements;

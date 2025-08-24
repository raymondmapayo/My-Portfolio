import { CiMenuFries } from "react-icons/ci";

const Header = ({
  onMenuClick,
  isSidebarOpen,
}: {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white dark:bg-[#2b1d11] md:hidden transition-all duration-300 sticky top-0 z-50 shadow-sm ${
        isSidebarOpen ? "translate-y-[-100%]" : "translate-y-0"
      }`}
    >
      {/* Menu Icon */}
      <div className="flex items-center gap-3">
        <CiMenuFries
          className="text-2xl cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300"
          onClick={onMenuClick}
        />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col text-right">
          <span className="text-xs leading-3 font-medium text-gray-800 dark:text-gray-100">
            Im Raymond
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-300">
            Im Raymond
          </span>
        </div>
        <img
          src="/maps_image.jpg"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default Header;

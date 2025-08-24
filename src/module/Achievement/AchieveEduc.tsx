// import { CalendarOutlined, ExportOutlined } from "@ant-design/icons";
// import { Button, Card } from "antd";
// import { useState } from "react";

// import { BsBookHalf } from "react-icons/bs";

// const AchieveEduc = () => {
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

//   // Open full image in new tab
//   const handleOpenFullImage = (imageUrl: string) => {
//     window.open(imageUrl, "_blank");
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
//       {/* Section Title */}
//       <div className="flex items-center gap-3 mb-6">
//         <BsBookHalf className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Education
//         </h2>
//       </div>

//       {/* Grid of Certificates */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
//         {Education.map((item) => (
//           <div
//             key={item.id}
//             className="relative w-full"
//             onMouseEnter={() => setHoveredId(item.id)}
//             onMouseLeave={() => setHoveredId(null)}
//           >
//             <Card
//               hoverable
//               className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg"
//               bodyStyle={{ display: "none" }}
//               cover={
//                 <div className="relative">
//                   <img
//                     alt={item.title}
//                     src={item.certificateImage}
//                     className="w-full h-44 object-cover rounded-lg"
//                   />

//                   {/* Hover Button */}
//                   <div
//                     className={`absolute left-2 bottom-2 z-10 transition-all duration-500 ease-in-out ${
//                       hoveredId === item.id
//                         ? "opacity-100 translate-y-0"
//                         : "opacity-0 translate-y-4"
//                     }`}
//                   >
//                     <Button
//                       icon={<ExportOutlined />}
//                       size="middle"
//                       className="bg-white text-gray-700 border border-gray-300 px-3 py-1 text-sm font-medium hover:shadow-lg"
//                       onClick={() => handleOpenFullImage(item.certificateImage)}
//                     >
//                       Show Credentials
//                     </Button>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Info Section */}
//             <div className="flex items-start gap-3 mt-3">
//               <img
//                 src={item.avatarImage}
//                 alt={item.title}
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <div className="flex flex-col">
//                 <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
//                   {item.title}
//                 </h3>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                   {item.organization}
//                 </span>
//                 <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1 text-xs">
//                   <CalendarOutlined className="text-[10px]" />
//                   <span>{item.dateIssued}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AchieveEduc;

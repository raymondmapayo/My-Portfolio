// components/TodayDate.tsx
import React from "react";

interface TodayDateProps {
  offset?: number; // 0 = today, 1 = tomorrow, etc.
}

const TodayDate: React.FC<TodayDateProps> = ({ offset = 0 }) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset); // add offset days

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short", // Thu
    month: "long", // August
    day: "numeric", // 14
    year: "numeric", // 2025
  });

  return <span>{formattedDate}</span>;
};

export default TodayDate;

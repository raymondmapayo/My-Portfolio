// Loader.tsx (nested)
import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white dark:bg-gray-900">
      <Spin size="large">
        {/* child content is required for tip to show in nested pattern */}
        <div style={{ minHeight: 120 }} />
      </Spin>
    </div>
  );
}

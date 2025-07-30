import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface DonutRechartProps {
  percentage: number; // 0-100の範囲で割合を指定
  label?: string; // チャートのラベル（オプション）
  color?: string; // メインカラー（オプション）
  backgroundColor?: string; // 背景カラー（オプション）
  size?: number; // チャートサイズ（オプション）
}

const DonutRechart: React.FC<DonutRechartProps> = ({
  percentage,
  label = "進捗",
  color = "#36A2EB",
  backgroundColor = "#E5E5E5",
  size = 200,
}) => {
  // 0-100の範囲に制限
  const validPercentage = Math.max(0, Math.min(100, percentage));
  const remainingPercentage = 100 - validPercentage;
  const data = [
    { name: label, value: validPercentage },
    { name: "残り", value: remainingPercentage },
  ];

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={(size * 0.7) / 2}
          outerRadius={size / 2}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          isAnimationActive={true}
          animationDuration={1000}
        >
          <Cell key="main" fill={color} />
          <Cell key="bg" fill={backgroundColor} />
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [`${value}%`, name]}
        />
      </PieChart>
      {/* 中央に割合を表示 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "24px",
          fontWeight: "bold",
          color: color,
          pointerEvents: "none",
        }}
      >
        {validPercentage}%
      </div>
    </div>
  );
};

export default DonutRechart;

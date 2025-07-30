import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.jsに必要なコンポーネントを登録
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  percentage: number; // 0-100の範囲で割合を指定
  label?: string; // チャートのラベル（オプション）
  color?: string; // メインカラー（オプション）
  backgroundColor?: string; // 背景カラー（オプション）
}

const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  label = "進捗",
  color = "#36A2EB",
  backgroundColor = "#E5E5E5",
}) => {
  // 0-100の範囲に制限
  const validPercentage = Math.max(0, Math.min(100, percentage));
  const remainingPercentage = 100 - validPercentage;

  const data = {
    labels: [label, "残り"],
    datasets: [
      {
        data: [validPercentage, remainingPercentage],
        backgroundColor: [color, backgroundColor],
        borderWidth: 0,
        cutout: "70%", // ドーナツの中央の空洞サイズ
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 凡例を非表示
      },
      tooltip: {
        callbacks: {
          label: function (context: { label: string; parsed: number }) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "200px", height: "200px" }}>
      <Doughnut data={data} options={options} />
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
        }}
      >
        {validPercentage}%
      </div>
    </div>
  );
};

export default DonutChart;

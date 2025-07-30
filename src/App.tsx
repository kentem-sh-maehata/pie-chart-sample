import { useState } from "react";
import "./App.css";
import DonutChart from "./components/chartjs";
import DonutRechart from "./components/rechart";
import DonutPure from "./components/pure";

type Kind = "rechart" | "chartJs" | "pure";
function App() {
  const [kind, setKind] = useState<Kind>();

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={() => setKind("rechart")}>rechart</button>
        <button onClick={() => setKind("chartJs")}>chartJs</button>
        <button onClick={() => setKind("pure")}>純粋実装</button>
      </div>
      {kind === "rechart" ? (
        <div style={{ padding: "20px" }}>
          <h2>ドーナツチャート サンプル（Recharts）</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div>
              <h3>75%</h3>
              <DonutRechart percentage={75} label="完了" color="#4CAF50" />
            </div>
            <div>
              <h3>30%</h3>
              <DonutRechart percentage={30} label="進捗" color="#FF9800" />
            </div>
            <div>
              <h3>90%</h3>
              <DonutRechart percentage={90} label="達成率" color="#2196F3" />
            </div>
          </div>
        </div>
      ) : kind === "chartJs" ? (
        <div style={{ padding: "20px" }}>
          <h2>ドーナツチャート サンプル（Chart.js）</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div>
              <h3>75%</h3>
              <DonutChart percentage={75} label="完了" color="#4CAF50" />
            </div>
            <div>
              <h3>30%</h3>
              <DonutChart percentage={30} label="進捗" color="#FF9800" />
            </div>
            <div>
              <h3>90%</h3>
              <DonutChart percentage={90} label="達成率" color="#2196F3" />
            </div>
          </div>
        </div>
      ) : kind === "pure" ? (
        <div style={{ padding: "20px" }}>
          <h2>ドーナツチャート サンプル（純粋実装）</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div>
              <h3>75%</h3>
              <DonutPure percentage={75} label="完了" color="#4CAF50" />
            </div>
            <div>
              <h3>30%</h3>
              <DonutPure percentage={30} label="進捗" color="#FF9800" />
            </div>
            <div>
              <h3>90%</h3>
              <DonutPure percentage={90} label="達成率" color="#2196F3" />
            </div>
          </div>
        </div>
      ) : (
        <p>上のボタンを選択してください</p>
      )}
    </>
  );
}

export default App;

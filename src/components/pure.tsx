import React from "react";

type Props = {
  percentage: number;
  label: string;
  color: string;
};

const SIZE = 120;
const THICKNESS = 16;

const DonutPure: React.FC<Props> = ({ percentage, label, color }) => {
  // 色部分だけアニメーションする
  const [animated, setAnimated] = React.useState(0);

  React.useEffect(() => {
    // ease-in-out 関数
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    let start: number | null = null;
    const duration = 300;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const linear = Math.min((timestamp - start) / duration, 1);
      const eased = easeInOut(linear);
      setAnimated(eased * percentage);
      if (linear < 1) {
        requestAnimationFrame(step);
      }
    };
    setAnimated(0);
    requestAnimationFrame(step);
  }, [percentage]);

  const donutStyle: React.CSSProperties = {
    width: SIZE,
    height: SIZE,
    borderRadius: "50%",
    background: `conic-gradient(${color} 0% ${animated}%, #eee ${animated}% 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "background 0.3s",
  };
  const holeStyle: React.CSSProperties = {
    width: SIZE - THICKNESS * 2,
    height: SIZE - THICKNESS * 2,
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: THICKNESS,
    left: THICKNESS,
    zIndex: 1,
  };
  const textStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    fontSize: "1.5em",
    color: "#333",
    zIndex: 2,
    pointerEvents: "none",
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        width: SIZE,
        height: SIZE,
        margin: "0 auto",
      }}
    >
      <div style={donutStyle}>
        <div style={holeStyle}></div>
        <div style={textStyle}>{Math.round(percentage)}%</div>
      </div>
      <div style={{ marginTop: "8px", color: color, fontWeight: "bold" }}>
        {label}
      </div>
    </div>
  );
};

export default DonutPure;

import React, { useEffect, useState } from "react";
import "./loading.css";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">

      {/* 🚜 Only Tractor Image */}
      <img
        src="/tractor.png"
        className="tractor-icon"
        alt="Tractor"
      />

      <h1 className="loading-title">Agri-Tech 2026</h1>
      <p className="loading-subtitle">Cultivating Innovation...</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="progress-text">{progress}%</p>
    </div>
  );
}

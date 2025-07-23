// src/pages/HisselerPage.js
import React, { useState } from "react";
import StockList from "../components/StockList";
import StockChart from "../components/StockChart";

const HisselerPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <StockList onSelect={setSelectedSymbol} />
      </div>
      <div style={{ flex: 2 }}>
        <StockChart symbol={selectedSymbol} />
      </div>
    </div>
  );
};

export default HisselerPage;

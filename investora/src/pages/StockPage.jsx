// src/pages/StockPage.js - FİNAL VERSİYON
import React, { useState } from "react";
import { Box } from "@mui/material";
import StockChart from "../components/StockChart";

// Stock List Component
const StockList = ({ onSelect, selectedSymbol }) => {
  const stocks = [
    { symbol: "ASELS", name: "Aselsan" },
    { symbol: "AKBNK", name: "Akbank" },
    { symbol: "THYAO", name: "Türk Hava Yolları" },
    { symbol: "TUPRS", name: "Tüpraş" },
    { symbol: "SISE", name: "Şişecam" },
    { symbol: "BIMAS", name: "BİM" },
    { symbol: "KRDMD", name: "Kardemir" },
    { symbol: "KOZAL", name: "Koza Altın" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        padding: "20px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <h3
        style={{
          color: "white",
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Türkiye Borsası Hisseleri
      </h3>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {stocks.map((stock) => (
          <Box
            key={stock.symbol}
            onClick={() => onSelect(stock.symbol)}
            sx={{
              padding: "12px 16px",
              borderRadius: "8px",
              border:
                selectedSymbol === stock.symbol
                  ? "2px solid #2196f3"
                  : "1px solid rgba(255, 255, 255, 0.3)",
              backgroundColor:
                selectedSymbol === stock.symbol
                  ? "rgba(33, 150, 243, 0.2)"
                  : "rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <div
              style={{ color: "white", fontWeight: "600", fontSize: "16px" }}
            >
              {stock.name}
            </div>
            <div
              style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}
            >
              {stock.symbol}
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const StockPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "80px",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        padding: "20px",
        display: "flex",
        gap: "20px",
        overflow: "auto",
      }}
    >
      {/* Sol taraf - Stock List */}
      <Box sx={{ flex: 1, minWidth: "320px", maxWidth: "400px" }}>
        <StockList
          onSelect={setSelectedSymbol}
          selectedSymbol={selectedSymbol}
        />
      </Box>

      {/* Sağ taraf - Chart */}
      <Box sx={{ flex: 2 }}>
        <StockChart symbol={selectedSymbol} />
      </Box>
    </Box>
  );
};

export default StockPage;

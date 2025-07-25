// src/components/StockList.js
import React from "react";
import { Box, Typography } from "@mui/material";

const trStocks = [
  { symbol: "ASELS", name: "Aselsan" },
  { symbol: "KRDMD", name: "Kardemir" },
  { symbol: "THYAO", name: "Türk Hava Yolları" },
  { symbol: "AKBNK", name: "Akbank" },
  { symbol: "SISE", name: "Şişecam" },
  { symbol: "TUPRS", name: "Tüpraş" },
  { symbol: "BIMAS", name: "BİM" },
  { symbol: "KOZAL", name: "Koza Altın" },
];

const StockList = ({ onSelect, selectedSymbol }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "white", marginBottom: "20px", fontWeight: "bold" }}
      >
        Türkiye Borsası Hisseleri
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {trStocks.map((stock) => (
          <Box
            key={stock.symbol}
            onClick={() => onSelect(stock.symbol)}
            sx={{
              cursor: "pointer",
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
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Typography
              sx={{ color: "white", fontWeight: "600", fontSize: "16px" }}
            >
              {stock.name}
            </Typography>
            <Typography
              sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}
            >
              {stock.symbol}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StockList;

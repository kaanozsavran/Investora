// src/components/StockList.js
import React from "react";

const trStocks = [
  { symbol: "BIST:ASELS", name: "Aselsan" },
  { symbol: "BIST:KRDMD", name: "Kardemir" },
  { symbol: "BIST:THYAO", name: "Türk Hava Yolları" },
  { symbol: "BIST:AKBNK", name: "Akbank" },
  { symbol: "BIST:SISE", name: "Şişecam" },
  // Listeyi ihtiyaca göre uzatabilirsin
];

const StockList = ({ onSelect }) => {
  return (
    <div>
      <h3>Türkiye Borsası Hisseleri</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {trStocks.map((stock) => (
          <li
            key={stock.symbol}
            onClick={() => onSelect(stock.symbol)}
            style={{
              cursor: "pointer",
              margin: "8px 0",
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {stock.name} ({stock.symbol.replace("BIST:", "")})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;

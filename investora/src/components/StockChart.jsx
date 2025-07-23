// src/components/StockChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const API_KEY = "d20fe9pr01qog25mlnc0d20fe9pr01qog25mlncg";

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchCandleData = async () => {
      setLoading(true);
      setError(null);

      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - 30 * 24 * 60 * 60; // 30 gün öncesi

        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`
        );
        const data = await response.json();

        if (data.s !== "ok") {
          setError("Veri bulunamadı veya hata oluştu");
          setChartData(null);
          setLoading(false);
          return;
        }

        const labels = data.t.map((ts) =>
          new Date(ts * 1000).toLocaleDateString()
        );
        const prices = data.c;

        setChartData({
          labels,
          datasets: [
            {
              label: `${symbol.replace("BIST:", "")} Kapanış Fiyatı`,
              data: prices,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        });
      } catch (err) {
        setError("Veri çekme hatası");
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCandleData();
  }, [symbol]);

  if (!symbol) return <div>Hisse seçiniz</div>;
  if (loading) return <div>Grafik yükleniyor...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return chartData ? <Line data={chartData} /> : null;
};

export default StockChart;

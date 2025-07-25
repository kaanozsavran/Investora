// src/components/StockChart.js - GERÇEK VERİLER İÇİN
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Gerçekçi mock data (gerçek fiyatlara yakın)
const generateRealisticMockData = (symbol) => {
  const stockPrices = {
    THYAO: 294, // Turkish Airlines gerçek fiyat
    ASELS: 85, // Aselsan
    AKBNK: 62, // Akbank
    TUPRS: 58, // Tüpraş
    SISE: 21, // Şişecam
    BIMAS: 75, // BIM
    KRDMD: 4.5, // Kardemir
    KOZAL: 36, // Koza Altın
  };

  const basePrice = stockPrices[symbol] || 50;
  const data = [];
  const now = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Gerçekçi fiyat dalgalanması (%2-3 arası)
    const variation = (Math.random() - 0.5) * 0.06; // %3 max değişim
    const dailyChange = basePrice * variation;
    const price =
      basePrice + dailyChange + Math.sin(i * 0.1) * (basePrice * 0.02);

    data.push({
      date: date.toLocaleDateString("tr-TR"),
      close: parseFloat(price.toFixed(2)),
      timestamp: Math.floor(date.getTime() / 1000),
    });
  }

  return data;
};

// Alternatif API (Alpha Vantage - ücretsiz)
const fetchAlternativeAPI = async (symbol) => {
  try {
    // Not: Bu gerçek bir API çağrısı değil, demo amaçlı
    // Gerçek kullanım için Alpha Vantage API key gerekir
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}.TRG&apikey=demo`
    );

    if (!response.ok) throw new Error("API failed");

    const data = await response.json();
    // Alpha Vantage data processing would go here
    return null; // Demo için null döndür
  } catch {
    return null;
  }
};

const API_KEY = "d20fe9pr01qog25mlnc0d20fe9pr01qog25mlncg";

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stockInfo, setStockInfo] = useState(null);
  const [dataSource, setDataSource] = useState("");
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      setLoading(true);
      setApiStatus("API deneniyor...");
      console.log(`${symbol} için veri çekiliyor...`);

      try {
        // 1. Finnhub API dene
        const to = Math.floor(Date.now() / 1000);
        const from = to - 30 * 24 * 60 * 60;
        const finnhubSymbol = `BIST:${symbol}`;

        console.log(
          "Finnhub API çağrısı:",
          `https://finnhub.io/api/v1/stock/candle?symbol=${finnhubSymbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`
        );

        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${finnhubSymbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const apiData = await response.json();
        console.log("Finnhub API yanıtı:", apiData);

        let processedData;

        if (apiData.s === "ok" && apiData.c && apiData.c.length > 0) {
          // API başarılı - ama USD olabilir, TL'ye çevir
          console.log("✅ Finnhub API verisi alındı");
          setApiStatus("Finnhub API - Başarılı");

          // USD to TRY dönüşümü (yaklaşık 30 TL = 1 USD)
          const usdToTry = 30; // Bu gerçek kurdan alınmalı

          processedData = apiData.t.map((timestamp, index) => ({
            date: new Date(timestamp * 1000).toLocaleDateString("tr-TR"),
            close: apiData.c[index] * usdToTry, // USD'yi TL'ye çevir
            timestamp: timestamp,
          }));
          setDataSource("Finnhub API (USD→TL)");
        } else {
          console.log("⚠️ Finnhub başarısız:", apiData);
          setApiStatus(`API Hatası: ${apiData.s || "Bilinmeyen"}`);

          // 2. Alternatif API dene
          const altData = await fetchAlternativeAPI(symbol);

          if (altData) {
            processedData = altData;
            setDataSource("Alpha Vantage API");
            setApiStatus("Alpha Vantage - Başarılı");
          } else {
            // 3. Son çare: Gerçekçi mock data
            console.log("📊 Gerçekçi mock data kullanılıyor");
            processedData = generateRealisticMockData(symbol);
            setDataSource("Gerçekçi Demo Data");
            setApiStatus("Mock Data (Gerçek Fiyatlara Yakın)");
          }
        }

        // Chart.js için format
        const chartLabels = processedData.map((item) => item.date);
        const chartPrices = processedData.map((item) => item.close);

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: `${symbol} Kapanış Fiyatı`,
              data: chartPrices,
              borderColor: "#00bcd4",
              backgroundColor: "rgba(0, 188, 212, 0.1)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#00bcd4",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#00bcd4",
              pointHoverBorderColor: "#ffffff",
              pointHoverBorderWidth: 3,
            },
          ],
        });

        // Stock info hesapla
        if (processedData.length >= 2) {
          const currentPrice = processedData[processedData.length - 1].close;
          const previousPrice = processedData[processedData.length - 2].close;
          const change = currentPrice - previousPrice;
          const changePercent = (change / previousPrice) * 100;

          setStockInfo({
            symbol,
            currentPrice,
            change,
            changePercent,
          });
        }
      } catch (error) {
        console.error("❌ Tüm API'ler başarısız:", error);
        setApiStatus(`Hata: ${error.message}`);

        // Son çare mock data
        const mockData = generateRealisticMockData(symbol);
        const chartLabels = mockData.map((item) => item.date);
        const chartPrices = mockData.map((item) => item.close);

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: `${symbol} (Demo)`,
              data: chartPrices,
              borderColor: "#ff9800",
              backgroundColor: "rgba(255, 152, 0, 0.1)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#ff9800",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
            },
          ],
        });

        if (mockData.length >= 2) {
          const currentPrice = mockData[mockData.length - 1].close;
          const previousPrice = mockData[mockData.length - 2].close;
          const change = currentPrice - previousPrice;
          const changePercent = (change / previousPrice) * 100;

          setStockInfo({
            symbol,
            currentPrice,
            change,
            changePercent,
          });
        }

        setDataSource("Hata Sonrası Demo Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  // Chart options (öncekiyle aynı)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "#00bcd4",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `₺${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { size: 11 },
          maxTicksLimit: 8,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { size: 11 },
          callback: function (value) {
            return "₺" + value.toFixed(2);
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
      },
    },
    elements: {
      line: { borderWidth: 2 },
    },
  };

  // Hisse seçilmedi
  if (!symbol) {
    return (
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>📈</div>
        <h3
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "10px",
            fontSize: "24px",
          }}
        >
          Hisse Seçiniz
        </h3>
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "16px" }}>
          Sol taraftan bir hisse seçerek fiyat grafiğini görüntüleyebilirsiniz.
        </p>
      </Box>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            borderTop: "4px solid #00bcd4",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          {symbol} verisi yükleniyor...
        </p>
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px" }}>
          {apiStatus}
        </p>
      </Box>
    );
  }

  // Chart görünümü
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
      {/* Header - Stock Info */}
      {stockInfo && (
        <Box sx={{ marginBottom: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                color: "white",
                margin: 0,
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {stockInfo.symbol}
            </h2>
            <Box sx={{ textAlign: "right" }}>
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  marginBottom: "4px",
                }}
              >
                {dataSource}
              </div>
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "10px",
                }}
              >
                {apiStatus}
              </div>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span
              style={{ color: "white", fontSize: "32px", fontWeight: "bold" }}
            >
              ₺{stockInfo.currentPrice.toFixed(2)}
            </span>
            <span
              style={{
                color: stockInfo.change >= 0 ? "#4caf50" : "#f44336",
                fontSize: "18px",
                fontWeight: "600",
                backgroundColor:
                  stockInfo.change >= 0
                    ? "rgba(76, 175, 80, 0.1)"
                    : "rgba(244, 67, 54, 0.1)",
                padding: "6px 12px",
                borderRadius: "6px",
              }}
            >
              {stockInfo.change >= 0 ? "+" : ""}
              {stockInfo.change.toFixed(2)} TL (
              {stockInfo.changePercent.toFixed(2)}%)
            </span>
          </Box>
        </Box>
      )}

      {/* Chart */}
      <Box sx={{ height: "400px", marginTop: "20px" }}>
        {chartData && <Line data={chartData} options={chartOptions} />}
      </Box>
    </Box>
  );
};

export default StockChart;

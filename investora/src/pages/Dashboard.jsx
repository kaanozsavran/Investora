import { Grid, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

function Dashboard() {
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        📊 Yatırım Panosu
      </Typography>

      <Grid container spacing={3}>
        {[1, 2].map((_, i) => (
          <Grid item xs={12} md={6} key={i}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {i === 0 ? "Güncel Döviz Kurları" : "Piyasa Özeti"}
                  </Typography>
                  <Typography mt={1}>
                    {i === 0 ? (
                      <>
                        USD / TRY: 32.50
                        <br />
                        EUR / TRY: 35.80
                      </>
                    ) : (
                      <>
                        BIST 100: +1.2%
                        <br />
                        NASDAQ: -0.8%
                      </>
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

export default Dashboard;

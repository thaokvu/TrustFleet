import { Box, Card, Typography, Grid } from "@mui/material";

export default function Homepage() {
  return (
    <Box p={2}>

      {/* Main Content Section */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Card variant="outlined" sx={{ width: "60%", height: "400px" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h6" color="textSecondary">
              Main Content Area
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Footer / Lower Section with Cards */}
      <Grid container spacing={2} justifyContent="center">
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Card variant="outlined" sx={{ p: 2, textAlign: "center", height: "150px" }}>
              <Typography variant="body1" color="textSecondary">
                Additional Content #{item}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

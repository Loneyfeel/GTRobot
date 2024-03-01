import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { Box } from "@mui/material";

const CopyTableBodyCell = ({ data }) => (
  <Card sx={getCardStyle()}>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "110px",
        padding: "10px",
        "&.MuiCardContent-root: last-child": {
          paddingBottom: "10px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            {data.trader}
          </Typography>
          <IconButton color="primary">
            <StarOutlineRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.primary">
              ROI:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {format(data.roi)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.primary">
              PNL:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {format(data.pnl)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.primary">
              Subscribers:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {data.subscribers}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const getCardStyle = () => ({
  margin: "10px",
  textAlign: "left",
  bgcolor: "var(--tg-theme-bg-color)",
  padding: "1px",
});

const format = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default CopyTableBodyCell;

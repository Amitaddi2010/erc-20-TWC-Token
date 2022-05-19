import React, { useState, useRef } from "react";
import BuyForm from "./buyForm";
import SellForm from "./sellForm.jsx";
import "./App.css";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardAction,
  Input,
  Box,
  Paper,
  TextField,
} from "@mui/material";
const main = (props) => {
  const [form, setForm] = useState("buy");

  let content;
  if (form == "buy") {
    content = (
      <BuyForm
        etherBalance={props.etherBalance}
        tokenBalance={props.tokenBalance}
        buyTokens={props.buyTokens}
      />
    );
  } else {
    content = (
      <SellForm
        etherBalance={props.etherBalance}
        tokenBalance={props.tokenBalance}
        sellTokens={props.sellTokens}
      />
    );
  }
  // css

  return (
    // <div id="content" className="mt-3">
    //   <div className="d-flex justify-content-between mb-3">
    //     <Button
    //       onClick={() => {
    //         setForm("buy");
    //       }}
    //       color="secondary"
    //     >
    //       Buy
    //     </Button>

    //     {/* <span className="text-muted">&lt; &nbsp; &gt;</span> */}
    //     <Button
    //       onClick={() => {
    //         setForm("sell");
    //       }}
    //       color="secondary"
    //     >
    //       Sell
    //     </Button>
    //   </div>

    //   {/* <div className="card mb-4">
    //     <div className="card-body">{content}</div>
    //   </div> */}
    //   {/* material testing is going on */}

    //   <Card>
    //     <CardContent>{content}</CardContent>
    //   </Card>
    // </div>
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "24rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              setForm("buy");
            }}
            color="success"
            variant="contained"
          >
            Buy
          </Button>

          <Button
            onClick={() => {
              setForm("sell");
            }}
            color="error"
            variant="contained"
          >
            Sell
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            color: "white",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingRight: "1rem",
              paddingTop: "1rem",
              color: "white",
              border: "none",
            }}
          >
            {content}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default main;

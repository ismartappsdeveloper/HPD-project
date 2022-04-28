import React, { useState, useEffect } from "react";
import "./NinethStep.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import URL from "../../../../GlobalUrl";
import globalAPI from "../../../../GlobalApi";
import { Button, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import { Card } from "../../../../common";

const useStyles = makeStyles({});

const NinethStep = (props) => {
  //   const classes = useStyles();
  const [loader, setLoader] = useState(false);
  //   const [text, setText] = useState("");
  //   const token = JSON.parse(localStorage.getItem("user"));

  return (
    <Card>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <div>
        <Box style={{ position: "relative", marginLeft: "4%" }}>
          <span className="s8text1">Step 9 of 9</span>
          <div className="rca3left-bar"></div>{" "}
          <img
            src={require("../../../../Img/greentick.png")}
            className="greentick"
          />
        </Box>
      </div>

      <Box sx={{ mt: 8, marginLeft: "4%" }}>
        <Typography
          sx={{
            fontSize: "30px",
            fontFamily: "Outfit",
            fontWeight: "600",
          }}
        >
          Submission Successful
        </Typography>
      </Box>
      <Box sx={{ margin: "auto", width: "92%" }}>
        <hr style={{ borderTop: "1px solid grey" }} />
      </Box>
      <Box sx={{ mt: 8, marginLeft: "4%" }}>
        <Typography
          sx={{
            fontSize: "22px",
            fontFamily: "Outfit",
            fontWeight: "300",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "0.03px",
            textAlign: "left",
          }}
        >
          Your quote request submission is successful. Ref: SR12345678. You can
          track the status of your quote using View Quote Status.
        </Typography>
      </Box>
      <button
        style={{ marginTop: "4%", marginLeft: "4%" }}
        variant="contained"
        className="btn-house Add btn-icon"
        onClick={() => {
          props._jumpToFirst();
          //   props.getPayloadData(["other_details"], [text]);
          //   props._addNewQuote();
        }}
      >
        <span>Get a new Quote</span>
      </button>
    </Card>
  );
};

export default NinethStep;
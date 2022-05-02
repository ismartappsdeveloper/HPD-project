import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ServiceList.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../../GlobalUrl";
import globalAPI from "../../../GlobalApi";
import { TailSpin } from "react-loader-spinner";
import usePagination from "../../Pagination/Pagination";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Typography, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { FirstPageAction } from "../../../Redux/FirstPage/FirstPage.action";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Card, Pagination } from "../../../common";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StyledTextField from "../../../common/textfield";

const theme = createTheme({
  palette: {
    primary: { main: "#000000	" },
  },
});

const useStyles = makeStyles({
  textfield: {
    "& label.Mui-focused": {
      color: "black",
      fontFamily: "outfit",
      fontWeight: "bold",
      fontSize: "16px",
    },
    "& .MuiFormLabel-root": {
      fontWeight: "bold",
      fontSize: "16px",
      fontFamily: "outfit",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      marginRight: "20px",
      height: "45px",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    width: "25%",
  },
  selectfield: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      marginRight: "20px",
      height: "45px",
      fontWeight: "bolder",
      fontFamily: "outfit",
      backgroundColor: "white",

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    width: "25%",
  },
  selectinput: {
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "16.36px",
  },
  table: {
    fontFamily: "outfit",
    fontWeight: "bolder",
    fontSize: "16.36px",
  },
});

const ServiceList = ({ FirstPageAction }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [serviceno, setServiceno] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [box, setBox] = useState([]);
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [count, setCount] = useState(1);
  const _DATA = usePagination(data, PER_PAGE);
  const [status, setStatus] = useState("1");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData.name;
  const [focused, setFocused] = React.useState("");

  useEffect(() => {
    fetchData();
    // fetchSeconddata();
  }, [page, status]);

  useEffect(() => {
    FirstPageAction(true);
  }, []);

  function fetchData() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(URL + globalAPI.mystatus, config)
      .then((response) => {
        setLoader(false);
        const res = response.data;
        setBox(res.data);
        fetchSeconddata();
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  function fetchSeconddata() {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoader(true);
    axios
      .get(
        URL +
          globalAPI.myreq +
          `?page=${page}&perPage=${PER_PAGE}&status=${status}&f_title=${title}&f_priority=${priority}&f_srid=${serviceno}`,
        config
      )
      .then((response) => {
        setLoader(false);
        if (response.data.success) {
          const res = response.data.data;
          setCount(res.total_pages);
          setData(res.data);
          // debugger;
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        setLoader(false);
        toast.error("Something went wrong");
      });
  }
  const manageService = (item) => {
    navigate("/common/manageservice", { state: item._id });
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const searchfilter = () => {
    setStatus("1,2,3,4,5");
    setPage(1);
    fetchSeconddata();
  };
  return (
    <div>
      {loader && (
        <div className="customLoader">
          <TailSpin color="#fa5e00" height="100" width="100" />
        </div>
      )}
      <Typography
        variant="h6"
        style={{
          fontWeight: 300,
          fontSize: "60px",
          fontFamily: "outfit",
          marginLeft: "40px",
        }}
      >
        My Service Requests
        <hr className="containerhr" />
      </Typography>
      <Card>
        <Grid>
          <Stack>
            <Typography>
              <div className="names">{userName}</div>
              <div
                style={{
                  fontSize: "30px",
                  fontFamily: "Outfit",
                  fontWeight: "300",
                  textTransform: "none",
                }}
              >
                {userData.business_trade_name}, {userData.city}
              </div>
              <hr className="hrFirst" />
            </Typography>
          </Stack>
        </Grid>

        <Grid>
          <div className="secondrow">
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(1);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.new}
                </Typography>
              </div>
              <div className="second-row-text">New</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(5);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.hpd_review}
                </Typography>
              </div>
              <div className="second-row-text">HPD To Review</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(2);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.working}
                </Typography>
              </div>
              <div className="second-row-text">HPD Working</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(3);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.need_attention}
                </Typography>
              </div>
              <div className="second-row-text">Need Your Attention</div>
            </div>
            <div className="outerbox">
              <div
                className="squarebox"
                onClick={() => {
                  setStatus(4);
                  setPage(1);
                }}
              >
                <Typography style={{ fontSize: "40px", fontWeight: "600" }}>
                  {box.closed}
                </Typography>
              </div>
              <div className="second-row-text">Closed</div>
            </div>
          </div>
        </Grid>
        <Grid sx={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <Box
            sx={{ display: "flex", marginTop: "30px", marginBottom: "40px" }}
          >
            <Typography
              style={{
                fontSize: "22px",
                fontFamily: "Outfit",
                width: "130px",
                margin: "18px 10px 17px 0",
                fontWeight: "600",
              }}
            >
              Search By
            </Typography>
            <FormControl>
              <StyledTextField
                select
                sx={{ width: "210px", height: "63px", margin: " 0 40px 0 0" }}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                label="Priority"
              >
                <MenuItem value="1" style={{ fontWeight: 600 }}>
                  High
                </MenuItem>
                <MenuItem value="2" style={{ fontWeight: 600 }}>
                  Medium
                </MenuItem>
                <MenuItem value="3" style={{ fontWeight: 600 }}>
                  Low
                </MenuItem>
              </StyledTextField>
            </FormControl>
            <StyledTextField
              sx={{ width: "210px", height: "63px", margin: "0 30px" }}
              label="Service Request No"
              // InputLabelProps={{ style: { marginTop: "10px" } }}
              value={serviceno}
              onChange={(e) => setServiceno(e.target.value)}
              size="small"
            />

            <StyledTextField
              sx={{ width: "275px", height: "63px", margin: "0 30px" }}
              label="Title"
              value={title}
              // InputLabelProps={{ style: { marginTop: "10px" } }}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
            <Button
              style={{
                fontSize: "18px",
                fontWeight: "300",
                fontFamily: "Outfit",
                width: "130px",
                height: "63px",
                background: "black",
                color: "white",
                borderRadius: "50px",
              }}
              onClick={() => searchfilter()}
            >
              Search
            </Button>
          </Box>
        </Grid>

        <Grid>
          <div className="fourth-row">
            <div style={{ fontSize: "30px", fontWeight: "600" }}>
              Service Requests List
            </div>
            <hr className="hrFirst" />
            <div style={{ overflowX: "auto" }}>
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Priority
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        SR No.
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Title
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                        }}
                      >
                        Site Details
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                          width: "163px",
                        }}
                      >
                        SR Type
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                          width: "168px",
                        }}
                      >
                        Last Updated
                        <br />
                        Date & Time
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "22px",
                          fontFamily: "Outfit",
                          color: "#000",
                          fontWeight: 600,
                          width: "128px",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {_DATA.currentData().map((item, index) => (
                      <TableRow
                        onClick={() => manageService(item)}
                        key={index}
                        style={{
                          borderBottom: "solid 1px #d3d3d3",
                          cursor: "pointer",
                        }}
                      >
                        {item.priority == 1 && (
                          <TableCell>
                            <div className="hroundcircle">H</div>{" "}
                          </TableCell>
                        )}
                        {item.priority == 2 && (
                          <TableCell>
                            <div className="mroundcircle">M</div>{" "}
                          </TableCell>
                        )}
                        {item.priority == 3 && (
                          <TableCell>
                            <div className="lroundcircle">L</div>{" "}
                          </TableCell>
                        )}
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.service_ref_number}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.title}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.job_reference_id
                            ? item.job_reference_id.site_details
                            : "-"}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {item.type ? item.type : "-"}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Outfit",
                            color: "#000",
                          }}
                        >
                          {moment(item.updatedAt).format("DD/MM/YYYY h:mm a")}
                        </TableCell>
                        {item.status == 1 && (
                          <TableCell
                            style={{
                              fontSize: "18px",
                              fontFamily: "Outfit",
                              color: "#000",
                            }}
                          >
                            New
                          </TableCell>
                        )}
                        {item.status == 2 && (
                          <TableCell
                            style={{
                              fontSize: "18px",
                              fontFamily: "Outfit",
                              color: "#000",
                            }}
                          >
                            HPD Working
                          </TableCell>
                        )}
                        {item.status == 3 && (
                          <TableCell
                            style={{
                              fontSize: "18px",
                              fontFamily: "Outfit",
                              color: "#000",
                            }}
                          >
                            Need Your Attention
                          </TableCell>
                        )}
                        {item.status == 4 && (
                          <TableCell
                            style={{
                              fontSize: "18px",
                              fontFamily: "Outfit",
                              color: "#000",
                            }}
                          >
                            Resolved
                          </TableCell>
                        )}
                        {item.status == 5 && (
                          <TableCell
                            style={{
                              fontSize: "18px",
                              fontFamily: "Outfit",
                              color: "#000",
                            }}
                          >
                            HPD To Review
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {_DATA.currentData().length == 0 && (
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                No matching records found
              </h4>
            )}
          </div>
        </Grid>

        {_DATA.currentData().length >= 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "18px",
            }}
          >
            <ThemeProvider theme={theme}>
              <Pagination
                className="pagination"
                count={count}
                page={page}
                /*  variant="outlined" */
                onChange={handleChange}
                color="primary"
              />
            </ThemeProvider>
          </div>
        )}
        <button
          className="btnjob"
          onClick={(e) => navigate("/common/createlist")}
          style={{
            fontWeight: 300,
            fontSize: "18px",
            fontFamily: "Outfit",
            width: "275px",
            height: "65px",
          }}
        >
          Create a Service Request
        </button>
        {/* </div> */}
      </Card>
    </div>
  );
};

const mapDispatchtoProps = (dispatch) => ({
  FirstPageAction: (value) => dispatch(FirstPageAction(value)),
});

export default connect(null, mapDispatchtoProps)(ServiceList);

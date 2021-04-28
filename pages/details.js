import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Navbar from "../src/components/Navbar";
import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  getLoggedInToken,
  getLoggedInUser,
} from "../src/helpers/getLoggedState";
import axiosInstance from "../src/helpers/axiosInstance";
import { commaSeperatorInr } from "../src/helpers/formatter";

const useStyles = makeStyles({
  table: {
    // minWidth: 250,
  },
  bold: {
    fontWeight: 600,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const data = [
  {
    date: new Date().toDateString(),
    type: "income",
    amount: 100,
    balance: 2000,
  },
  {
    date: new Date().toDateString(),
    type: "expense",
    amount: 300,
    balance: 1600,
  },
];

export default function BasicTable() {
  const classes = useStyles();
  const [range, setRange] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [details, setDetails] = React.useState([]);
  const user = getLoggedInUser();
  const token = getLoggedInToken();

  useEffect(() => {
    const getDetails = () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      axiosInstance
        .get("/api", config)
        .then((res) => {
          setDetails(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    getDetails();
  }, []);

  console.log("data", details);

  return (
    <>
      <Navbar />

      <Container style={{ marginTop: 50 }}>
        <Grid container>
          <Grid item md={6} justify="center" style={{ display: "flex" }}>
            <KeyboardDatePicker
              style={{ width: "90%" }}
              variant="inline"
              format="MM/dd/yyyy"
              // margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={range.startDate}
              onChange={(val) => setRange({ ...range, startDate: val })}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>

          <Grid item md={6} justify="center" style={{ display: "flex" }}>
            <KeyboardDatePicker
              style={{ width: "90%" }}
              variant="inline"
              format="MM/dd/yyyy"
              // margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={range.startDate}
              onChange={(val) => setRange({ ...range, endDate: val })}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </Grid>
        <TableContainer style={{ marginTop: 50 }} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.bold}>S No</TableCell>
                <TableCell className={classes.bold} align="right">
                  Date
                </TableCell>
                <TableCell className={classes.bold} align="right">
                  Title
                </TableCell>
                <TableCell className={classes.bold} align="right">
                  Message
                </TableCell>
                <TableCell className={classes.bold} align="right">
                  Type
                </TableCell>
                <TableCell className={classes.bold} align="right">
                  Amount
                </TableCell>
                <TableCell className={classes.bold} align="right">
                  Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.length > 0 &&
                details.map((detail, index) => (
                  <TableRow key={detail._id}>
                    <TableCell
                    //  component="th" scope="row"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(detail.date).toDateString() || "NA"}
                    </TableCell>
                    <TableCell align="right">{detail.title}</TableCell>
                    <TableCell align="right">
                      {detail?.message || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        style={{
                          width: "100px",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                        variant="contained"
                        color={
                          detail.type === "income" ? "primary" : "secondary"
                        }
                      >
                        {detail?.type || "NA"}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {commaSeperatorInr(detail.amount || 0)}
                    </TableCell>
                    <TableCell align="right">
                      {commaSeperatorInr(detail.currentBalance || 0)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Navbar from "../src/components/Navbar";
import { Container, Grid, MenuItem, Select } from "@material-ui/core";
import axiosInstance from "../src/helpers/axiosInstance";
import {
  getLoggedInUser,
  getLoggedInToken,
} from "../src/helpers/getLoggedState";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const user = getLoggedInUser();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    marginTop: 50,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const user = getLoggedInUser();
  const token = getLoggedInToken();
  // console.log("token", user, getLoggedInToken());
  const initialIncome = {
    date: new Date(),
    amount: null,
    type: "income",
    title: "",
    message: "",
    user: user?._id,
  };

  const initialExpence = {
    date: new Date(),
    amount: null,
    type: "expence",
    user: user?._id,
    message: "",
    title: "",
  };

  const [income, setIncome] = React.useState(initialIncome);
  const [profile, setProfile] = React.useState(initialIncome);

  const [expence, setExpence] = React.useState(initialExpence);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const incomeChange = (val) => {
    setIncome({ ...income, date: val });
  };

  const incomeAmountChange = (e) => {
    setIncome({ ...income, amount: e.target.value });
  };

  const submitIncome = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axiosInstance
      .post("/api", { ...income, user: user._id }, config)
      .then((res) => {
        setIncome(initialIncome);
      })
      .catch((err) => console.log(err));
  };

  //for expoence
  const expenceDateChange = (val) => {
    setExpence({ ...expence, date: val });
  };

  const expenceAmountChange = (e) => {
    setExpence({ ...expence, amount: e.target.value });
  };

  const submitExpence = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axiosInstance
      .post("/api", { ...expence, user: user._id }, config)
      .then((res) => {
        setExpence(initialExpence);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axiosInstance
      .get(`/user/${user._id}`, config)
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className={classes.root}>
          <Typography variant="h5" component="h5" style={{ marginBottom: 20 }}>
            Add your income and expense
          </Typography>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Add Income" {...a11yProps(0)} />
              <Tab label="Add Expense" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid container>
                <Grid
                  item
                  md={6}
                  //   alignItems="center"
                  // justify=/"center"
                  //   alignContent="center"
                  // style={{ display: "flex" }}
                >
                  <KeyboardDatePicker
                    // disableToolbar
                    style={{ width: "90%" }}
                    variant="inline"
                    format="MM/DD/yyyy"
                    // margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={income.date}
                    onChange={incomeChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    style={{ width: "90%" }}
                    className={classes.margin}
                  >
                    <InputLabel htmlFor="standard-adornment-amount">
                      Amount
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={income.amount}
                      onChange={incomeAmountChange}
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <FormControl
                    style={{ width: "90%", marginTop: 30 }}
                    className={classes.margin}
                  >
                    <InputLabel htmlFor="standard-adornment-amount">
                      Message
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={income.message}
                      onChange={(e) =>
                        setIncome({ ...income, message: e.target.value })
                      }
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl style={{ width: "90%", marginTop: 30 }}>
                    <InputLabel id="demo-simple-select-label">
                      Income
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={income.title}
                      onChange={(e) =>
                        setIncome({ ...income, title: e.target.value })
                      }
                    >
                      {profile?.myIncome?.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    style={{ marginTop: 50, width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={submitIncome}
                  >
                    Add Income
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid container>
                <Grid item md={6}>
                  <KeyboardDatePicker
                    // disableToolbar
                    style={{ width: "90%" }}
                    variant="inline"
                    format="DD/MM/yyyy"
                    // margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={expence.date}
                    onChange={expenceDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    style={{ width: "90%" }}
                    className={classes.margin}
                  >
                    <InputLabel htmlFor="standard-adornment-amount">
                      Amount
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={expence.amount}
                      onChange={expenceAmountChange}
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    style={{ width: "90%", marginTop: 30 }}
                    className={classes.margin}
                  >
                    <InputLabel htmlFor="standard-adornment-amount">
                      Message
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={expence.message}
                      onChange={(e) =>
                        setExpence({ ...expence, message: e.target.value })
                      }
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl style={{ width: "90%", marginTop: 30 }}>
                    <InputLabel id="demo-simple-select-label">
                      Expense
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={expence.title}
                      onChange={(e) =>
                        setExpence({ ...expence, title: e.target.value })
                      }
                    >
                      {profile?.myExpense?.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    style={{ marginTop: 50, width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={submitExpence}
                  >
                    Add Expence
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </SwipeableViews>
        </div>
      </Container>
    </>
  );
}

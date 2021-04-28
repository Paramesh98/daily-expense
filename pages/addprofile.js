import {
  Avatar,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";
import CloseIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import axiosInstance from "../src/helpers/axiosInstance";
import {
  getLoggedInUser,
  getLoggedInToken,
} from "../src/helpers/getLoggedState";
import { useRouter } from "next/router";

function AddProfile() {
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    montlyIncome: "",
    relationshipStatus: "",
    myExpense: [],
    myIncome: [],
    balance: "",
  });
  const [expense, setExpense] = useState("");
  const [income, setIncome] = useState("");
  const token = getLoggedInToken();
  const user = getLoggedInUser();

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      marginTop: 50,
    },
  }));

  const deleteExpense = (item) => {
    let tempExpense = [...userData.myExpense];
    let removedExpense = tempExpense.filter((d) => d !== item);
    setUserData({ ...userData, myExpense: removedExpense });
  };

  const deleteIncome = (item) => {
    let tempIncome = [...userData.myIncome];
    let removedIncome = tempIncome.filter((d) => d !== item);
    setUserData({ ...userData, myIncome: removedIncome });
  };
  const classes = useStyles();
  const router = useRouter();

  const submitProfile = () => {
    // console.log("submit profile", userData);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axiosInstance
      .put(`/user/${user._id}`, userData, config)
      .then((res) => {
        console.log(res);
        router.push("/profile");
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
        setUserData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                type="text"
              />
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">
                Mobile
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                type="text"
              />
            </FormControl>
          </Grid>

          {/* <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={""}
                onChange={(e) => setUserData ({ ...userData, email: e.target.value })}
                type="text"
              />
            </FormControl>
          </Grid> */}

          <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">
                Montyly Income
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={userData.montlyIncome}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    montlyIncome: e.target.value,
                  })
                }
                type="text"
              />
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">
                Relationship Status
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={userData.relationshipStatus}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    relationshipStatus: e.target.value,
                  })
                }
                type="text"
              />
            </FormControl>
          </Grid>
          {/* <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">
                My Expense
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={""}
                //   onChange={
                //     // setIncome({ ...income, message: e.target.value })
                //   }
                type="text"
              />
            </FormControl>
          </Grid> */}

          <Grid md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <TextField
                id="standard-name"
                label="My Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={() => {
                        let tempExpense = [...userData.myExpense];
                        if (expense !== "") {
                          tempExpense.push(expense);
                          setUserData({ ...userData, myExpense: tempExpense });
                          setExpense("");
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
            <div>
              {userData.myExpense &&
                userData.myExpense.map((item) => (
                  <Chip
                    size="small"
                    //   avatar={<Avatar>M</Avatar>}
                    label={item}
                    onDelete={() => deleteExpense(item)}
                  />
                ))}
            </div>
          </Grid>

          <Grid md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <TextField
                id="standard-name"
                label="My Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={() => {
                        let tempExpense = [...userData.myIncome];
                        if (income !== "") {
                          tempExpense.push(income);
                          setUserData({ ...userData, myIncome: tempExpense });
                          setIncome("");
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
            <div>
              {userData.myIncome &&
                userData.myIncome.map((item) => (
                  <Chip
                    size="small"
                    //   avatar={<Avatar>M</Avatar>}
                    label={item}
                    onDelete={() => deleteIncome(item)}
                  />
                ))}
            </div>
          </Grid>

          <Grid item md={6}>
            <FormControl
              style={{ width: "90%", marginTop: 30 }}
              className={classes.margin}
            >
              <InputLabel htmlFor="standard-adornment-amount">
                Balance
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={userData.balance}
                onChange={(e) =>
                  setUserData({ ...userData, balance: e.target.value })
                }
                type="text"
              />
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <Button
              style={{ marginTop: 50, width: "100%" }}
              variant="contained"
              color="primary"
              onClick={submitProfile}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default AddProfile;

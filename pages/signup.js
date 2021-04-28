import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import axiosInstance from "../src/helpers/axiosInstance";
import Link from "next/link";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    // height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // marginTop: "50px",
  },
  text: {
    width: "100%",
  },
}));
function Login() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    montlyIncome: "",
    relationshipStatus: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [response, setResponse] = useState({
    loading: false,
    error: false,
    data: null,
  });
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const onSubmit = () => {
    let error = [];
    for (const [key, value] of Object.entries(userData)) {
      if (value === "") {
        error.push(key);
      }
    }
    setErrors(error);

    if (error.length === 0) {
      setResponse({ ...response, loading: true });
      axiosInstance
        .post("/user/signup", userData)
        .then((res) => {
          setResponse({ ...response, data: res.data.data });
          setToast("Successfully Saved");
          //  console.log(res);
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        })
        .catch((err) => {
          setResponse({
            ...response,
            error: err?.message || "Something went wrong",
          });
          setToast("Something went wrong");
        });
    } else {
      setToast("Enter all fields");
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={toast}
        autoHideDuration={5000}
        onClose={() => setToast(null)}
        message={toast}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setToast(null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Grid container>
        <Grid item md={4}></Grid>

        <Grid item md={4}>
          <Paper style={{ padding: "30px" }}>
            <h3 style={{ textAlign: "center" }}>Signup</h3>
            <Box mt={3}>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className={classes.text}
                error={errors.includes("email")}
                helperText="This is required field"
              />
            </Box>

            <Box mt={3}>
              <TextField
                type="text"
                id="outlined-basic"
                label="Name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                variant="outlined"
                className={classes.text}
                error={errors.includes("name")}
                helperText="This is required field"
              />
            </Box>
            <Box mt={3}>
              <TextField
                type="number"
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className={classes.text}
                error={errors.includes("phone")}
                helperText="This is required field"
              />
            </Box>
            <Box mt={3}>
              <TextField
                type="number"
                id="outlined-basic"
                onChange={(e) =>
                  setUserData({ ...userData, montlyIncome: e.target.value })
                }
                label="Monthly Income"
                variant="outlined"
                className={classes.text}
                error={errors.includes("montlyIncome")}
                helperText="This is required field"
              />
            </Box>

            <Box mt={3}>
              <TextField
                type="password"
                id="outlined-basic"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                label="Password"
                variant="outlined"
                className={classes.text}
                error={errors.includes("password")}
                helperText="This is required field"
              />
            </Box>
            <Box mt={3}>
              <TextField
                type="text"
                id="outlined-basic"
                label="Relationship Status"
                variant="outlined"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    relationshipStatus: e.target.value,
                  })
                }
                className={classes.text}
                error={errors.includes("relationshipStatus")}
                helperText="This is required field"
              />
            </Box>

            <Box mt={3}>
              {response.loading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="outlined"
                  className={classes.text}
                  color="primary"
                  onClick={onSubmit}
                >
                  Signup
                </Button>
              )}
            </Box>
            <Box mt={3}>
              <p>
                Already have account ?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </p>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </div>
  );
}

export default Login;

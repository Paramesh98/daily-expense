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
import Link from "next/link";
import axiosInstance from "../src/helpers/axiosInstance";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    width: "100%",
  },
}));
function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState(null);
  const [response, setResponse] = useState({
    loading: false,
    error: false,
    data: null,
  });
  const router = useRouter();
  const [cookie, setCookie] = useCookies();

  const onsubmit = () => {
    setResponse({ ...response, loading: true });
    axiosInstance
      .post("/user/login", data)
      .then((res) => {
        console.log(res);
        setCookie("user", res.data.user);
        setCookie("token", res.data.token);
        // setResponse({ ...response, data: response.data.token });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setResponse({
          ...response,
          error: err?.response?.data?.error || "Something went wrong",
        });
      });
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
            <h3 style={{ textAlign: "center" }}>Login</h3>
            <Box mt={3}>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                className={classes.text}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Box>
            <Box mt={3}>
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className={classes.text}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Box>

            <Box mt={3}>
              {/* {response.loading ? (
                <CircularProgress />
              ) : ( */}
              <Button
                variant="outlined"
                className={classes.text}
                color="primary"
                onClick={onsubmit}
              >
                Login
              </Button>
              {/* )} */}
            </Box>
            <Box mt={3}>
              <p>
                Don't have account ? <Link href="/signup">Signup</Link>
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

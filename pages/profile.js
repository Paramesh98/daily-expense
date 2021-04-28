import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Box,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Navbar from "../src/components/Navbar";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import {
  getLoggedInToken,
  getLoggedInUser,
} from "../src/helpers/getLoggedState";
import axiosInstance from "../src/helpers/axiosInstance";
import { commaSeperatorInr } from "../src/helpers/formatter";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  pos: {
    marginBottom: 12,
  },
  marginTop: {
    marginTop: 50,
  },
  bold: {
    fontWeight: 600,
  },
});

export default function Profile() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [cookie, setCookie, removeCookie] = useCookies();
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const token = getLoggedInToken();
  const user = getLoggedInUser();

  const logout = () => {
    removeCookie("user");
    removeCookie("token");
    router.push("/login");
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
        console.log(res);
        setProfile(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(profile);
  return (
    <React.Fragment>
      <Navbar />
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <Card className={(classes.root, classes.marginTop)}>
            <CardContent>
              <p className={classes.title} color="textSecondary">
                {new Date(Date.now()).toDateString()}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h6" component="h2">
                  Hey {profile.name} here's your details
                </Typography>
                <Button
                  onClick={() => router.push("/addprofile")}
                  variant="contained"
                  color="primary"
                >
                  Edit Profile
                </Button>
              </div>
              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      Name
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p variant="p">{profile.name}</p>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      Mobile
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p variant="p">{profile.phone}</p>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      Email
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p variant="p">{profile.email}</p>
                  </Grid>
                </Grid>{" "}
              </Box>
              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      Monthly Income
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p variant="p">
                      {commaSeperatorInr(profile.montlyIncome || 0)}
                    </p>
                  </Grid>
                </Grid>{" "}
              </Box>
              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      Relationship Status
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p variant="p">{profile.relationshipStatus}</p>
                  </Grid>
                </Grid>{" "}
              </Box>

              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      My Expenses
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    {/* <FormControl style={{ width: "90%", marginTop: 30 }}>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={20}
                        // onChange={handleChange}
                      >
                        {profile?.myExpense.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}

                    <p>
                      {profile?.myExpense?.map((item) => (
                        <span>{item + ", "}</span>
                      ))}
                    </p>
                  </Grid>
                </Grid>{" "}
              </Box>

              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      My Income
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p>
                      {profile?.myIncome?.map((item) => (
                        <span>{item + ", "}</span>
                      ))}
                    </p>
                  </Grid>
                </Grid>{" "}
              </Box>

              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <p className={classes.bold} variant="p">
                      Balance
                    </p>
                  </Grid>
                  <Grid item md={8}>
                    <p>{commaSeperatorInr(profile.balance || 0)}</p>
                  </Grid>
                </Grid>{" "}
              </Box>

              <Box mt={2}>
                <Grid container>
                  <Grid item md={4}>
                    <Button
                      onClick={logout}
                      variant="contained"
                      color="primary"
                    >
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </React.Fragment>
  );
}

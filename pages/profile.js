import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Box } from "@material-ui/core";

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
    fontSize: 14,
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

  return (
    <Grid container>
      <Grid item md={2}></Grid>

      <Grid item md={8}>
        <Card className={(classes.root, classes.marginTop)}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {new Date(Date.now()).toDateString()}
            </Typography>
            <Typography variant="h5" component="h2">
              Hey Paramesh Krishn here's your details
            </Typography>
            <Box mt={2}>
              <Grid container>
                <Grid item md={4}>
                  <Typography className={classes.bold} variant="p">
                    Name
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant="p">Paramesh Krishna</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid container>
                <Grid item md={4}>
                  <Typography className={classes.bold} variant="p">
                    Mobile
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant="p">8778090994</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid container>
                <Grid item md={4}>
                  <Typography className={classes.bold} variant="p">
                    Email
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant="p">paramesh@gmail.com</Typography>
                </Grid>
              </Grid>{" "}
            </Box>
            <Box mt={2}>
              <Grid container>
                <Grid item md={4}>
                  <Typography className={classes.bold} variant="p">
                    Monthly Income
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant="p">$20,000</Typography>
                </Grid>
              </Grid>{" "}
            </Box>
            <Box mt={2}>
              <Grid container>
                <Grid item md={4}>
                  <Typography className={classes.bold} variant="p">
                    Relationship Status
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant="p">Happy Single</Typography>
                </Grid>
              </Grid>{" "}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}

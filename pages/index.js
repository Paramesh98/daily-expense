import { Grid, Typography } from "@material-ui/core";
import Head from "next/head";
// import styles from "../styles/Home.module.css";
import Navbar from "../src/components/Navbar";
import Monthly from "../src/components/Montly";
import Weekly from "../src/components/Weekly";
import Daily from "../src/components/Daily";
import Account from "../src/components/Account";
import Container from "@material-ui/core/Container";
import Login from "./login";
import Signup from "./signup";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  getLoggedInToken,
  getLoggedInUser,
} from "../src/helpers/getLoggedState";
import { quotes } from "../src/config/quotes.json";

export default function Home() {
  const router = useRouter();
  const user = getLoggedInUser();

  useEffect(() => {
    if (user) {
      router.push(router.pathname);
    } else {
      router.push("/login");
    }
  }, [router.pathname]);

  let quote = quotes[Math.floor(Math.random() * 100)];

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (
        <>
          {" "}
          <Navbar />
          <Container>
            <Grid container>
              <Grid md={12}>
                <Typography
                  style={{
                    textAlign: "center",
                    margin: "20px",
                    marginBottom: 0,
                  }}
                  variant="h5"
                  component="h2"
                >
                  {quote.quote}
                </Typography>

                <p style={{ textAlign: "center", marginTop: 0 }}>
                  - {quote.author}
                </p>
              </Grid>
              <Grid item md={4}>
                <Monthly />
              </Grid>
              <Grid item md={4}>
                <Weekly />
              </Grid>
              <Grid item md={4}>
                <Daily />
              </Grid>
              <Grid item md={12}>
                <Account />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
}

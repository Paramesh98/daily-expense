import "../styles/globals.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library
import MomentUtils from "@date-io/moment";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getLoggedInUser } from "../src/helpers/getLoggedState";

function MyApp({ Component, pageProps }) {
  const [cookie, setCookie] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookie.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }, []);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Component {...pageProps} />
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;

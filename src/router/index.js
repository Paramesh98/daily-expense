import { useRouter } from "next/router";
import React from "react";
import { getLoggedInUser } from "../helpers/getLoggedState";

function PrivateRoute({ path }) {
  const user = getLoggedInUser();
  const router = useRouter();

  if (user) {
    router.route(path);
  } else {
    router.push("/login");
  }
}

export default PrivateRoute;

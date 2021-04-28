import { useRouter } from "next/router";
import React from "react";
import { getLoggedInUser } from "../helpers/getLoggedState";

function privateRoute({ component: Component }, ...rest) {
  const router = useRouter();
  const user = getLoggedInUser();

  if (user) {
    return <Component {...props} />;
  } else {
    router.push("/login");
  }
}

export default privateRoute;

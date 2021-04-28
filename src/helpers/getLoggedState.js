import { useCookies } from "react-cookie";

export const getLoggedInToken = () => {
  const [cookie, setCookie] = useCookies();
  if (cookie.token) {
    return cookie.token;
  } else {
    return null;
  }
};

export const getLoggedInUser = () => {
  const [cookie, setCookie] = useCookies();

  return cookie.user;
};

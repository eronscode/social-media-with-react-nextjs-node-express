import React from "react";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { redirectUser } from "../utils/hooks/api/useAuthUser";
import {parseCookies, destroyCookie } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../utils/baseUrl";

function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes = ctx.pathname === "/";

  if (!token) {
    protectedRoutes && redirectUser(ctx, "/login");
  }
  //
  else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    try {
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token },
      });

      const { user, userFollowStats } = res.data;

      if (user) !protectedRoutes && redirectUser(ctx, "/");

      pageProps.user = user;
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }

  return { pageProps };
};

export default App;

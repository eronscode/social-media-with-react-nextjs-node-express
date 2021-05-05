import React from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";

function Layout() {
  return (
    <>
      <HeadTags />

      <Navbar />

      <Container style={{ paddingTop: "1rem" }} text></Container>
    </>
  );
}

export default Layout;

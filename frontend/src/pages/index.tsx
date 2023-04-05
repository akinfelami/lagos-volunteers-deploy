import Head from "next/head";
import React, { useEffect } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Grid, Stack } from "@mui/material";
import { useAuth } from "@/utils/AuthContext";
import Login from "@/components/Login";

const Home = () => {
  const { user, loading, error, signOutUser } = useAuth();

  const handleSignOut = async () => {
    await signOutUser();
  };

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Volunteer Platform</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid
          container
          height="100vh"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <h1 className="text-blue-300">Using Material UI with Next.js</h1>
          <Stack direction="row" columnGap={1}>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button onClick={handleSignOut} variant="outlined">
              Click to Sign out
            </Button>
          </Stack>
        </Grid>
      </main>
    </>
  );
};

export default Home;
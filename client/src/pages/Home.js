import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Home() {
  const [sessionID, setSessionID] = useState("");

  let navigate = useNavigate();
  const onSubmit = () => {
    axios.post("http://localhost:3001/").then((response) => {
      console.log(response.data);
      setSessionID(response.data._id);
      navigate(`/setup/session-id=/${response.data._id}`);
    });
  };

  const theme = createTheme({
    palette: {
      white: {
        main: "#fff",
        contrastText: "#000",
      },
    },
  });

  return (
    <div className="home area ">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 30, sm: 40, md: 40, lg: 50 },
              color: "#fff",
            }}
          >
            Group planning has never been easier.
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Typography
            sx={{
              fontWeight: "regular",
              fontSize: { xs: 17, sm: 17, md: 17, lg: 20 },
              color: "#fff",
            }}
          >
            Create a list of options, share your list with friends, and see what
            everyone voted for.
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="white" onClick={onSubmit}>
              Get Started
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Congratulations({ selectedOption, sessionID }) {


  useState(() => {
    axios.put(`${process.env.REACT_APP_DB_URL}/selected-option`, {
      data: {
        selectedOption: selectedOption,
      },
    });
  }, []);

  let navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/results/session-id=/${sessionID}`);
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        columns={{ xs: 1, md: 1, lg: 1 }}
      >
        <Grid item xs={1} md={1} lg={1}>
          <Card sx={{ width: 200 }} className="cardResult">
            <CardContent>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
              >
                Congratulations!
              </Typography>
              <Typography
                sx={{
                  fontWeight: "regular",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                You selected {selectedOption.optionName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          Click here to view the result of everyone else that voted.
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          <Button variant="contained" onClick={onSubmit}>
            View Results
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Congratulations;

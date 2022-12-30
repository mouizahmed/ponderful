import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

function Congratulations({ selectedOption, sessionID }) {
  console.log(selectedOption);

  const [selection, setSelected] = useState();

  useState(() => {
    axios.put("http://localhost:3001/selected-option", {
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

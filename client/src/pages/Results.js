import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Results() {
  let { sessionID } = useParams();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-results/${sessionID}`)
      .then((response) => {
        console.log(response.data);
        setOptions(response.data);
      });
  }, []);

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
          <Typography
            sx={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
          >
            Results
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          columns={{ xs: 2, md: 2, lg: 2 }}
          sx={{ textAlign: "center" }}
        >
          {options.slice(0, 1).map((row) => (
            <Grid item xs={2} md={2} lg={2} key={row._id}>
              <Card sx={{ width: 260 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "Bold",
                      fontSize: 30,
                      textAlign: "center",
                    }}
                  >
                    1. {row.optionName}: {row.optionValue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {options.slice(1, 2).map((row) => (
            <Grid item xs={2} md={2} lg={2} key={row._id}>
              <Card sx={{ width: 240 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "Bold",
                      fontSize: 25,
                      textAlign: "center",
                    }}
                  >
                    2. {row.optionName}: {row.optionValue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {options.slice(2, 3).map((row) => (
            <Grid item xs={2} md={2} lg={2} key={row._id}>
              <Card sx={{ width: 220 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "Bold",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    3. {row.optionName}: {row.optionValue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {options.slice(3).map((row) => (
            <Grid item xs={2} md={2} lg={2} key={row._id}>
              <Card sx={{ width: 200 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "Regular",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    {row.optionName}: {row.optionValue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Results;

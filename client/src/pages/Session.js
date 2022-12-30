import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Congratulations from "../components/Congratulations";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Session() {
  let { sessionID } = useParams();
  const [selectedOption, setSelectedOption] = useState();
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [endingIndex1, setEndingIndex1] = useState(0);
  const [endingIndex2, setEndingIndex2] = useState(0);

  const [single, setSingle] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    console.log("hi");
    axios
      .get(`http://localhost:3001/get-options/${sessionID}`)
      .then((response) => {
        // console.log(response.data.length);
        setOptions1(response.data);
        setOptions2(response.data.slice(1));

        if (response.data.length === 1) {
          setSingle(true);
        }

        setLoading(false);
      });
    //console.log(window.location.href);
  }, [sessionID]);

  //   const removeOption1 = (data) => { // RIGHT CLICKED

  //     setOptions1(options1.filter((val) => val._id !== data._id));
  //     setEndingIndex1(endingIndex1 + 1)

  //   };

  //   const removeOption2 = (data) => { // LEFT CLICKED
  //     console.log(data.optionName);

  //     setOptions2(options2.filter(function(val) { // OPTIONS2 IS RIGHT
  //         return val._id !== data._id

  //     }));
  //     setOptions1(options1.filter((val) => val._id !== element2.current))
  //     setEndingIndex2(endingIndex2 + 1)

  //   };

  const firstOption = (data) => {
    // console.log(data);
    //setEndingIndex2(endingIndex2 + 1);
    const removed = options2[0];
    //setOptions2(options2.splice(1))
    console.log(removed._id);
    setSelectedOption(data);
    setOptions2(
      options2.splice(1).filter((val) => {
        return val._id !== data._id;
      })
    );
    setOptions1(
      options1.filter((val) => {
        return val._id !== removed._id;
      })
    );
  };

  const secondOption = (data) => {
    //setEndingIndex1(endingIndex2 + 1);
    const removed = options1[0];
    setSelectedOption(data);
    //console.log(removed);
    console.log(data);
    //setOptions1(options1.splice(1));
    setOptions1(
      options1.splice(1).filter((val) => {
        return val._id !== data._id;
      })
    );

    setOptions2(
      options2.filter((val) => {
        return val._id !== removed._id;
      })
    );
    //setOptions1(options1.filter((val) => val._id !== id));
    //setOptions1(options1.filter((val) => val._id !== removed._id))
  };

  if (isLoading) {
    return <div className="App"></div>;
  }

  if (options1.length === 0 && options2.length === 0) {
    return (
      <div>
        <Typography
          sx={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
        >
          Sorry, we found no options.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(`/setup/session-id=/${sessionID}`)}
        >
          Please add more options here
        </Button>
      </div>
    );
  } else if (
    (options1.length > 1 && options2.length > 0) ||
    (options1.length > 0 && options2.length > 1)
  ) {
    return (
      <div className="App">
        <div className="session">
          <Grid
            container
            spacing={2}
            columns={{ xs: 2, md: 2, lg: 2 }}
            sx={{ textAlign: "center" }}
          >
            <Grid item xs={1} md={1} lg={1}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
                columns={{ xs: 2, md: 2, lg: 2 }}
                sx={{ textAlign: "center" }}
              >
                <Grid item xs={2} md={2} lg={2} sx={{ textAlign: "center" }}>
                  {
                    options1.map((data, i, row) => (
                      <Card
                        sx={{ width: 150 }}
                        className="cardSession"
                        key={data._id}
                        onClick={() => firstOption(data)}
                      >
                        <CardContent>{data.optionName}</CardContent>
                      </Card>
                    ))[endingIndex1]
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} md={1} lg={1} sx={{ textAlign: "center" }}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
                columns={{ xs: 2, md: 2, lg: 2 }}
                sx={{ textAlign: "center" }}
              >
                <Grid item xs={2} md={2} lg={2} sx={{ textAlign: "center" }}>
                  {
                    options2.map((data, i, row) => (
                      <Card
                        sx={{ width: 150 }}
                        className="cardSession"
                        key={data._id}
                        onClick={() => secondOption(data)}
                      >
                        <CardContent>{data.optionName}</CardContent>
                      </Card>
                    ))[endingIndex2]
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* {options.slice(0, 2).map((option) => (
                    <div key={option._id}>{option.optionName}</div>
                ))} */}
          {/* <button onClick={next}>next</button> */}
        </div>
      </div>
    );
  } else if (single) {
    return (
      <div>
        <Typography
          sx={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
        >
          Sorry, you only added 1 option.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(`/setup/session-id=/${sessionID}`)}
        >
          Please add more options here
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        {console.log(options1)}
        <Congratulations
          selectedOption={selectedOption}
          sessionID={sessionID}
        />
      </div>
    );
  }
}

export default Session;

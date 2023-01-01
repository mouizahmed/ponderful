import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

function Setup() {
  let { sessionID } = useParams();
  // const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [update, setUpdate] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  //console.log(sessionID);

  const validationSchema = yup.object({
    option: yup
      .string("Enter an Option")
      .required("Please enter an option before submitting!"),
  });

  const formik = useFormik({
    initialValues: {
      option: "",
      sessionID: sessionID,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axios
        .post(`${process.env.PUBLIC_API_URL}/new-option`, values)
        .then((response) => {
          console.log(response.data);
          setUpdate(!update);
        });

      resetForm({ values: "" });
    },
  });

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_API_URL}/get-options/${sessionID}`)
      .then((response) => {
        console.log(response.data);
        setOptions(response.data);
      });
    console.log(window.location.href);
  }, [update]);

  const onSubmit = () => {
    navigator.clipboard.writeText(
      `https://ponderful.vercel.app/` + `session/session-id=/${sessionID}`
    );
    setCopySuccess(true);
  };

  const onDelete = (e, optionID) => {
    console.log(optionID);

    axios
      .delete(`${process.env.REACT_APP_API_URL}/delete-option`, {
        data: {
          optionID: optionID,
          sessionID: sessionID,
        },
      })
      .then((response) => {});
    setOptions(
      options.filter((val) => {
        return val._id !== optionID;
      })
    );
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={{ xs: 2, md: 2, lg: 2 }}
        sx={{ textAlign: "center" }}
      >
        <Grid item xs={2} md={2} lg={2}>
          Option
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} columns={{ xs: 1, md: 1, lg: 1 }}>
              <Grid item xs={1} md={1} lg={1}>
                <TextField
                  id="option"
                  name="option"
                  label="Option"
                  value={formik.values.option}
                  onChange={formik.handleChange}
                  error={formik.touched.option && Boolean(formik.errors.option)}
                  helperText={formik.touched.option && formik.errors.option}
                />
              </Grid>
              <Grid item xs={1} md={1} lg={1} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!formik.dirty}
                >
                  Add Option
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={1} md={1} lg={1} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            sx={{ width: 200 }}
            onClick={() => {
              onSubmit();
            }}
          >
            Share your Session
          </Button>
        </Grid>
        <Grid item xs={1} md={1} lg={1} sx={{ textAlign: "left" }}>
          <Button variant="contained" type="submit" sx={{ width: 200 }}>
            View Results
          </Button>
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            columns={{ xs: 2, md: 2, lg: 2 }}
            sx={{ textAlign: "center" }}
          >
            {options.map((option) => (
              <Grid
                item
                xs={2}
                md={2}
                lg={2}
                sx={{ textAlign: "center" }}
                key={option._id}
              >
                <Card sx={{ width: 300 }}>
                  <CardContent>
                    <Grid
                      container
                      justify="flex-end"
                      alignItems="center"
                      className="card"
                      columns={{ xs: 2, md: 2, lg: 2 }}
                    >
                      <Grid
                        item
                        xs={1}
                        md={1}
                        lg={1}
                        sx={{ textAlign: "left" }}
                      >
                        <Typography variant="h5" component="div">
                          {option.optionName}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        md={1}
                        lg={1}
                        sx={{ textAlign: "right" }}
                      >
                        <CloseIcon
                          className="delete"
                          onClick={(e) => {
                            onDelete(e, option._id);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Setup;

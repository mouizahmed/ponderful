import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

function Setup() {
  let { sessionID } = useParams();
  let navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [update, setUpdate] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);

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
      axios
        .post(`${process.env.REACT_APP_DB_URL}/new-option`, values)
        .then((response) => {
          setUpdate(!update);
        });

      resetForm({ values: "" });
    },
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DB_URL}/get-options/${sessionID}`)
      .then((response) => {
        setOptions(response.data);
        setLoading(false);
      });
  }, [update]);

  const onSubmit = () => {
    navigator.clipboard.writeText(
      `https://ponderful-backend.vercel.app/` + `session/session-id=/${sessionID}`
    );
    setCopySuccess(true);
  };

  const onDelete = (optionID) => {
    axios
      .delete(`${process.env.REACT_APP_DB_URL}/delete-option`, {
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

  if (loading) {
    return <div className="App"></div>;
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={{ xs: 2, md: 2, lg: 2 }}
        sx={{ textAlign: "center" }}
      >
        <Grid item xs={2} md={2} lg={2}>
        <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 30, sm: 40, md: 40, lg: 50 },
            }}
          >Add options to your pool</Typography>
          People will choose between each option you create.
          
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} columns={{ xs: 1, md: 1, lg: 1 }}>
              <Grid item xs={1} md={1} lg={1}>
                <TextField
                  id="option"
                  name="option"
                  label="Option Name"
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
          <Button
            variant="contained"
            type="submit"
            sx={{ width: 200 }}
            onClick={() => navigate(`/results/session-id=/${sessionID}`)}
          >
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
                          onClick={() => {
                            onDelete(option._id);
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

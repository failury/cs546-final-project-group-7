import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import LOGO from '../assets/LOGO.jpg'
const theme = createTheme();

async function signupUser(credentials) {
  return fetch("http://localhost:2000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      if (!data.ok) {
        return data.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return data.json();
      }
    })
    .catch((error) => {
      throw error;
    });
}

export default function SignUp({ setToken }) {
  const [error, seterror] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    let firstname = data.get("firstName");
    let lastname = data.get("lastName");
    let username = data.get("username");
    let password = data.get("password");
    let email = data.get("email");
    let url =
      data.get("profilepicture") == null ? "" : data.get("profilepicture");
    if (!firstname || !lastname || !username || !email || !password) {
      seterror("Please enter all require information");
      return;
    }
    username = username.toString().trim();
    password = password.toString().trim();
    email = email.toString().trim();
    if (username.trim().length < 4) {
      seterror("username length must be greater than 4");
      return;
    }
    if (!username.trim().match(/^[0-9a-z]+$/)) {
      seterror("username contains non alphanumeric");
      return;
    }
    if (password.trim().length < 6) {
      seterror("password length must be greater than 6");
      return;
    }

    if (
      !email.trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      seterror("Email should be in proper format");
      return;
    }

    try {
      const res = await signupUser({
        firstname,
        lastname,
        username,
        email,
        password,
        url,
      });
      console.log(res);
      window.location.href = "/login";
    } catch (error) {
      seterror(error.message.replace(/['"]+/g, ''));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src={LOGO}  sx={{ m: 1, width: 128, height: 128 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="profilepicture"
                  label="Profile Picture URL"
                  name="profilepicture"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Id" name="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                component="div"
                gutterBottom
                color="error"
              >
                {error}
              </Typography>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired,
};

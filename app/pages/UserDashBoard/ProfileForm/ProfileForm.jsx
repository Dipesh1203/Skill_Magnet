import React from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const ProfileForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "70%", mx: "auto", mt: 2, p: 2 }}>
      <p variant="h1">Profile </p>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Material-UI Form</FormLabel>
          <FormGroup>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox />} label="Remember me" />
          </FormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ProfileForm;

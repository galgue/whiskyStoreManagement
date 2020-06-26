import React from "react";
import { Typography, Link } from "@material-ui/core";

export const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mh-distillery.com/he/">
          Milk&Honey
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
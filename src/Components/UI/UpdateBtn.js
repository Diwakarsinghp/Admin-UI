import React from "react";
import Button from "@mui/material/Button";

function UpdateBtn(props) {
  return (
    <>
      <Button variant="contained" size="medium" onClick={props.onClick}>
        update
      </Button>
    </>
  );
}

export default UpdateBtn;

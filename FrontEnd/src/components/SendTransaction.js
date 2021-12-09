import React from "react";
import { Fab } from "@mui/material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import axios from "axios";
import useToken from "../components/useToken";
export default function SendTransaction(data) {
  const { token, setToken } = useToken();
  const handleSendData = async (event) => {
    if (data == null) {
      alert("You don't have any transactions!");
      return;
    }
    event.preventDefault();
    axios
      .post("http://localhost:2000/transaction/mail", data, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((res) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleSendData}
        sx={{
          position: "fixed",
          margin: 0,
          top: "auto",
          right: 40,
          bottom: 120,
          left: "auto",
        }}
      >
        <AttachEmailIcon />
      </Fab>
    </>
  );
}

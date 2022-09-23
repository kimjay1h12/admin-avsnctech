import {
  Delete,
  Forward,
  Reply,
  Summarize,
  ViewAgenda,
  VisibilitySharp,
} from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";
import { Refresh } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import { Analytics } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { useState, useMemo } from "react";
import { firebaseConfig } from "../../Backend/Firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";

import { DataGrid } from "@mui/x-data-grid";
import { Chart } from "react-google-charts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({});
function Content() {
  const [value, setValue] = useState([{}]);
  const [value2, setValue2] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const app = initializeApp(firebaseConfig);

  const classes = useStyles();

  const dbRef = ref(getDatabase(app));

  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const object = childSnapshot.val();

        const data = [];

        setValue2(childKey);
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            data.push(element);
          }
        }

        setValue(data);
      });
    },
    {
      onlyOnce: true,
    }
  );

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          marginTop: 100,
          background: "transparent",
          borderColor: "#fff",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="right" style={{ paddingRight: 50 }}>
                Country
              </TableCell>
              <TableCell align="right" style={{ paddingRight: 50 }}>
                Messages
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ padding: 300 }}>
            {value.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="right" style={{ paddingRight: 50 }}>
                  {row.countryset}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      marginLeft: "0",
                      ["@media (min-width : 1200px)"]: {
                        marginLeft: "50%",
                      },
                    }}
                    style={{
                      wordBreak: "break-all",
                      width: "300px",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {row.message}
                    <Button
                      mt={5}
                      variant="text"
                      sx={{ background: "transparent" }}
                      onClick={() => (window.location = "mailto:" + row.email)}
                    >
                      Reply
                      <Reply />
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    //
  );
}

export default Content;

import { Delete, Summarize } from "@mui/icons-material";
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

const useStyles = makeStyles({
  root: {
    "& .MuiButton-root": {
      transition: "all 0.3s",
      background: "#000",

      fontSize: "10px",
      fontWeight: "900",
      color: "#fff",
      ["@media (min-width:1200px)"]: {
        fontSize: "12px",
      },
    },
    "& .MuiTypography-root": { color: "#000" },
    "& .MuiTypography-h5": {
      fontSize: "20px",
      transition: "all 0.3s",
      color: "#000",
      ["@media (min-width:1200px)"]: {
        fontSize: "35px",
      },
    },
    "& .MuiGrid-item": {
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      justifyContent: "space-between",
      flexDirection: "column",
      ["@media (min-width:1200px)"]: {
        display: "flex",
        flexDirection: "row",
      },
    },
  },
});
function Content() {
  const [value, setValue] = useState([{}]);
  const [value2, setValue2] = useState("");

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
              <TableCell>Names</TableCell>
              <TableCell align="right" style={{ marginRight: 50 }}>
                Emails
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
                <TableCell align="right">{row.email}</TableCell>
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

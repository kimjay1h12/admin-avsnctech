import { Summarize } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";
import { Refresh } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import { Analytics } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { firebaseConfig } from "../../Backend/Firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const items = [
  {
    title: "Generate Report",
    icon: <Analytics />,
  },
  {
    title: "Quick Search",
    icon: <Search />,
  },
  {
    title: "Summary",
    icon: <Summarize />,
  },
  {
    title: "Message",
    icon: <Mail />,
  },
  {
    title: "Settings",
    icon: <Settings />,
  },
];
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
      color: "#fff",
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
  const [value2, setValue2] = useState([]);
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
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];

            data.push(element);
          }
        }
        setValue(data);
        console.log(data);
      });
    },
    {
      onlyOnce: true,
    }
  );

  return (
    <div className={classes.root}>
      <header>
        <Grid container justifyContent="space-between" flexDirection="row">
          <Typography variant="h5">Dashboard</Typography>

          <Button root href="/">
            <Refresh />
          </Button>
        </Grid>
      </header>
      <Grid container gap={2} justifyContent="center" mt={2}>
        {value.map((cur, index) => (
          <Grid
            item
            xs={12}
            md={2.5}
            lg={2.5}
            key={index}
            minHeight={400}
            border="0.1px solid #999"
            borderRadius={5}
            overflow="auto"
            gap={3}
            style={{
              background: "#fff9",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={26}
              fontWeight={700}
              textTransform="capitalize"
            >
              Name: {cur.name}
            </Typography>
            <Typography fontSize={15} textTransform="capitalize">
              <span style={{ fontWeight: 700 }}>Email:</span> {cur.email}
            </Typography>
            <Typography fontSize={15} textTransform="capitalize">
              Message: {cur.message}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Content;

import { ArrowBack, Search } from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { firebaseConfig } from "../../Backend/Firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
function Index() {
  const app = initializeApp(firebaseConfig);
  const [name, setName] = useState();
  const db = getDatabase(app);
  const handleDelete = () => {
    remove(ref(db, "users/" + { name }));
  };
  return (
    <div>
      <ButtonBase href="/">
        <ArrowBack style={{ marginTop: 4, marginLeft: 10, fontSize: 30 }} />
      </ButtonBase>

      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item display="flex" gap={10} flexDirection="column">
          <Typography variant="h4" textAlign="center" fontWeight={700}>
            Delete Mails
            <br /> Easly By Just Providing Name
          </Typography>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <FormControl
              sx={{ width: "30vw", background: "#fff9" }}
              variant="outlined"
            >
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                }
                label="Password"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <Button
              onClick={handleDelete}
              size="lg"
              sx={{
                background: "red",
                borderRadius: "0",
                color: "#000",
                height: "53px",
              }}
            >
              Delete Mail
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Index;

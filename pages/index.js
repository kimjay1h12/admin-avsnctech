import { AccountCircle, Mail, Password } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "./components/Layout";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from "../Backend/Firebase";
import { initializeApp } from "firebase/app";
const img = "/img/img11.jpg";
export default function Home() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState("Input Email and Password to Continue");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const router = useRouter();
  const handleSignin = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Incorrect Email or Password");
      });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item md={6} width={400} bgcolor="#999" padding={2}>
        <div
          style={{
            gap: 10,
            mt: 50,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {error}
          <FormControl root variant="outlined" fullWidth="100%">
            <OutlinedInput
              sx={{
                background: "#fff",
                margin: "0",
                width: "100%",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <Mail />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Email"
              type="text"
              name="name"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("Input Email and Password to Continue");
              }}
            />
          </FormControl>
          <FormControl root variant="outlined" fullWidth="100%">
            <OutlinedInput
              sx={{
                background: "#fff",
                margin: "0",
                width: "100%",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <Password />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="password"
              name="email"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("Input Email and Password to Continue");
              }}
            />
          </FormControl>

          <Grid
            width="100%"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              type="submit"
              variant="outlined"
              onClick={handleSignin}
              sx={{
                width: "100%",

                background: "#000",
                color: "#999",
                minHeight: 52,
              }}
            >
              Login
            </Button>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

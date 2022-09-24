import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Content from "./Content";
import { Person } from "@mui/icons-material";
import { MailLock } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import Mails from "./Mails";
import { Icon } from "@mui/material";

const useStyles = makeStyles({
  root: {
    transition: "all 0.3s",
    "& 	.MuiAppBar-positionFixed": {
      boxShadow: "none",
      transition: "all 0.3s",
    },

    "& .MuiListItem-root :hover": {
      transition: "all 0.3s",
      background: "#f90",
      borderRadius: "20px",
      color: "#Fff",
    },
    "& .MuiTypography-h6": {
      transition: "all 0.3s",
      fontSize: "17px",
      fontWeight: "700",
      color: "#fff",
      display: "none",

      ["@media (min-width:1200px)"]: {
        transition: "all 0.3s",
        fontSize: "30px",
        color: "#fff",
        fontWeight: "900",

        display: "block",
      },
    },
    ["@media (min-width:1200px)"]: {
      transition: "all 0.3s",
      "& .MuiTypography-h4 img": {
        display: "none",
      },
    },
  },
});

const drawerWidth = 240;
const content = [
  {
    url: <Content />,
    title: "Home",
    icon: <Home />,
  },

  {
    url: "/3",
    title: "Names",
    icon: <Person />,
  },
  {
    url: <Mails />,
    title: "Mails",
    icon: <MailLock />,
  },
];

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [link, setLink] = React.useState(<Content />);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{ background: "#777" }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0vh,30vw",
          }}
        >
          <img src="/img/logo.png" alt="/logo" height="100%" width="100%" />
        </Typography>
      </Toolbar>

      <List style={{ background: "#777", minHeight: "93.2vh" }}>
        {content.map((text, index) => (
          <ListItem
            sx={{ marginTop: " 10px", color: "#fff" }}
            root
            key={index}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                setLink(text.url);
              }}
            >
              <ListItemIcon
                style={{ display: "flex", alignItems: "center", color: "#fff" }}
              >
                {text.icon}{" "}
                <ListItemText style={{ marginLeft: 20, color: "#fff" }}>
                  {" "}
                  {text.title}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            background: "#fff",
            boxShadow: "none",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Grid
              container
              alignItems="center"
              justifyContent="flex-end"
              textAlign="center"
              border="none"
            >
              {" "}
              <Typography variant="h4">
                <img
                  src="/img/logo.png"
                  height="100%"
                  width="100%"
                  style={{ objectFit: "cover", padding: 2 }}
                />
              </Typography>
              <Icon />
              <Typography color="#999">Welcome Avsyntech !!!</Typography>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: " #999",
            minHeight: "100vh",
            p: 3,

            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          {link}
        </Box>
      </Box>
    </div>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;

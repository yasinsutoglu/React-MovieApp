import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import  { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import {useNavigate}  from "react-router-dom"
import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  Avatar  from "@mui/material/Avatar";



const drawerWidth = 200;
const navItems = ["Home", "Login", "Register"];

function Navbar(props) {
  // const { window } = props;
  
   const { genUser } = useAuthContext();
   console.log(genUser);
  
    const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = ()=>{
    toast.success("Successfully Logout", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    signOut(auth)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center"}}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={()=> navigate("/")}>
        React Movie App
      </Typography>
      <Divider />
      <List>
        {!genUser?.email ? navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center"}}>
              <NavLink to={`${item.toLowerCase()}`} style={{ color: "#031a44" , textDecoration:"none"}}>
                  {item}
                </NavLink> 
            </ListItemButton>
          </ListItem>
        )) : <>
         <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center"}}>
              <NavLink to="/" style={{ color: "#031a44" , textDecoration:"none"}}>
                  Home
                </NavLink> 
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center"}} onClick={handleLogout}>
              <NavLink to="#" style={{ color: "#031a44" , textDecoration:"none"}}>
                  Logout
                </NavLink> 
            </ListItemButton>
          </ListItem> </>}
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
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

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            REACT MOVIE APP
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block flex" } }}>

        {!genUser?.email ? navItems.map((item) => (
          <Button key={item} sx={{ color: "#fff" }} >           
              <NavLink to={`${item.toLowerCase()}`} style={{ color: "#c6cdda" , textDecoration:"none"}}>
                  {item}
                </NavLink>            
          </Button>
        )) : <> 
        
        <Button sx={{ color: "#fff" }} >
              <NavLink to="/" style={{ color: "#c6cdda" , textDecoration:"none"}}>
                  Home
                </NavLink> 
          </Button>
          <Button sx={{ color: "#fff" }} onClick={handleLogout}>
              <NavLink to="#" style={{ color: "#c6cdda" , textDecoration:"none"}}>
                  Logout
                </NavLink> 
          </Button> 
           <NavLink to="#" style={{ color: "#c6cdda" , textDecoration:"none"}}>
               {genUser.displayName ? genUser.displayName : genUser.email}
          </NavLink>
         <Avatar alt="user" src={genUser.photoURL} />
           </> }

          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          // container={container}
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
      </Box>

       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}


export default Navbar;

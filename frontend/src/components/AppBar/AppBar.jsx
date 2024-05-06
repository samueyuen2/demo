// React
import { useState } from 'react'

// react-router-dom
import { useNavigate } from "react-router-dom";

// MUI
import {
  AppBar, Box,
  Toolbar, Typography,
  Button, IconButton,
  Drawer, List, Divider,
  ListItem, ListItemButton,
  ListItemIcon, ListItemText
} from '@mui/material';

// MUI Icon
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DashboardIcon from '@mui/icons-material/Dashboard';

function LoginDialog(props) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => { setIsDrawerOpen(true) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Samuel Yuen Demo
        </Typography>
        {
          !!props?.isLoggedIn &&
          <Button color="inherit" variant="outlined" onClick={() => { navigate('/'); props?.onLogout(); }}>
            Logout
          </Button>
        }
      </Toolbar>

      <Drawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/about'); setIsDrawerOpen(false); }}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={"About Me"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/listToDoItems'); setIsDrawerOpen(false); }}>
              <ListItemIcon><ChecklistIcon /></ListItemIcon>
              <ListItemText primary={"Basic - To-Do List"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/dashboard'); setIsDrawerOpen(false); }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={"TechTest - Dashboard"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate('/insight'); setIsDrawerOpen(false); }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={"TechTest - Insight"} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </AppBar>
  )
}

export default LoginDialog

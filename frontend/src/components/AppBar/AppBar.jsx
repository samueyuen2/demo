// React
import { useState } from 'react'

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

function LoginDialog(props) {

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
        <Button color="inherit"
          onClick={props?.onLogout}>Logout</Button>
      </Toolbar>

      <Drawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}

export default LoginDialog

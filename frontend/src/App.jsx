import { useState } from 'react'
import { BrowserRouter, } from "react-router-dom";

// Components
import LoginDialog from './components/LoginDialog/LoginDialog'
import AppBar from './components/AppBar/AppBar'

// Router
import Router from './router';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material'

// Theme
import DefaultTheme from './theme/default';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ThemeProvider theme={DefaultTheme} >
      <BrowserRouter>
        <AppBar onLogout={() => { setIsLoggedIn(false) }} isLoggedIn={isLoggedIn} />
        <Box sx={{ m: "0 10%" }}>
          {/* {
            isLoggedIn ?
              <> */}
                <Router />
              {/* </>
              :
              <LoginDialog
                open={!isLoggedIn}
                onClick={() => { setIsLoggedIn(true); }}
              />
          } */}
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

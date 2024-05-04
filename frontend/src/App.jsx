import { useState } from 'react'
import { BrowserRouter, } from "react-router-dom";

// Components
import LoginDialog from './components/LoginDialog/LoginDialog'
import LoadingBackdrop from './components/LoadingBackdrop/LoadingBackdrop'
import AppBar from './components/AppBar/AppBar'

// Router
import Router from './router';

// MUI
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@mui/material'

// Theme
import DefaultTheme from './theme/default';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ThemeProvider theme={DefaultTheme} >
      <LoadingBackdrop />
      <BrowserRouter>
        <AppBar onLogout={() => { setIsLoggedIn(false) }} isLoggedIn={isLoggedIn} />
        <Container maxWidth="lg">
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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

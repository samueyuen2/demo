// import './App.css'
import { useState } from 'react'

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
      {/* <Box maxWidth="xl" sx={{ margin: "0 auto"}}> */}
      <Box sx={{ width: '100%' }}>
        {
          isLoggedIn ?
            <>
              <AppBar onLogout={() => { setIsLoggedIn(false) }} />
              <Router />
            </>
            :
            <LoginDialog
              open={!isLoggedIn}
              onClick={() => { setIsLoggedIn(true); }}
            />
        }
      </Box>
      {/* </Box> */}
    </ThemeProvider>
  )
}

export default App

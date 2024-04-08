import { useState } from 'react'
import LoginDialog from './components/LoginDialog/LoginDialog'
import Router from './router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {
        isLoggedIn ?
          <>
            {/* <NavBar /> */}
            <Router />
          </>
          :
          <LoginDialog
            open={!isLoggedIn}
            onClick={() => { setIsLoggedIn(true); }}
          />
      }
    </>
  )
}

export default App

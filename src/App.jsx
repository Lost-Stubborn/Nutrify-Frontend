import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Notfound from './components/Notfound'
import Track from './components/Track'
import { UserContext } from './contexts/UserContext'

function App() {

  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    console.log(loggedUser)
  })

  return (
    <>
      
      <UserContext.Provider value={{loggedUser,setLoggedUser}}>

        <BrowserRouter>

          <Routes>

              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/track' element={<Track/>}/>
              <Route path='*' element={<Notfound/>}/>

          </Routes>

        </BrowserRouter>

      </UserContext.Provider>

    </>
  )
}

export default App

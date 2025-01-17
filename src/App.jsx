import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Notfound from './components/Notfound'
import Track from './components/Track'
import Diet from './components/Diet'
import { UserContext } from './contexts/UserContext'
import Private from './components/Private'

function App() {


  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrify-user")))
  
  // useEffect(() => {
  //   console.log(loggedUser)
  // })

  return (
    <>
      
      <UserContext.Provider value={{loggedUser,setLoggedUser}}>

        <BrowserRouter>

          <Routes>

              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/track' element={<Private Component={Track}/>}/>
              <Route path='/diet' element={<Private Component={Diet}/>}/>
              <Route path='*' element={<Notfound/>}/>

          </Routes>
          
          </BrowserRouter>

      </UserContext.Provider>

    </>
  )
}

export default App

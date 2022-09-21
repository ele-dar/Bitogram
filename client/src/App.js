import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import MainContext from './context/MainContext'
import Alert from './components/Alert'
import Header from './components/Header'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Photos from './pages/Photos'
import PhotoSingle from './pages/PhotoSingle'
import PhotoNew from './pages/PhotoNew'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import UserPage from './pages/UserPage'


function App() {
  const [alert, setAlert] = useState({ message: '', status: '' })
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [refresh, setRefresh] = useState(false)

  const contextValues = { alert, setAlert, isLoggedin, setIsLoggedin, userInfo, setUserInfo, isSearchClicked, setIsSearchClicked, searchInput, setSearchInput }

  useEffect(() => {
    axios.get('/api/users/check-auth')
      .then(resp => {
        setIsLoggedin(true)
        setUserInfo(resp.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <div className='container my-5 rounded border' style={{ maxWidth: '576px' }}>
          <Header />
          <Alert />

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            {isLoggedin && (
              <>
                <Route path='/photos' element={<Photos />} />
                <Route path='/photos/:id' element={<PhotoSingle />} />
                <Route path='/photos/new' element={<PhotoNew />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/user/:id' element={<UserPage />} />
                <Route path='/profile/edit' element={<ProfileEdit />} />
              </>
            )}
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App

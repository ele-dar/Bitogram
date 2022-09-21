import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'

const Logout = () => {
    const { setAlert, setIsLoggedin, setUserInfo, setIsSearchClicked, setSearchInput } = useContext(MainContext)
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('/api/users/logout')
            .then(resp => {
                setIsLoggedin(false)
                setUserInfo({})
                setIsSearchClicked(false)
                setSearchInput('')
                navigate('/')
            })
            .catch(e => {
                console.log(e)
                setAlert({
                    message: e.response.data,
                    status: 'danger'
                })
            })
    }, [])

    return
}

export default Logout
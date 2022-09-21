import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Login = () => {
    const { setIsLoggedin, setAlert, setUserInfo } = useContext(MainContext)
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/login', form)
            .then(resp => {
                setIsLoggedin(true)
                setUserInfo(resp.data.user)
                navigate('/photos')
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }

    return (
        <main className='text-center my-5 container form-signin' style={{ maxWidth: '20rem' }}>
            <form onSubmit={handleSubmit}>
                <h1 className='h3 mb-3 fw-normal'>Prisijungimas</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="username" name="username" onChange={(e) => handleForm(e)} />
                    <label htmlFor="floatingInput">Vartotojo vardas</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={(e) => handleForm(e)} />
                    <label htmlFor="floatingPassword">Slaptažodis</label>
                </div>
                <button className="mt-3 w-100 btn btn-lg btn-secondary" type="submit">Tęsti</button>
            </form>
        </main>
    )
}

export default Login
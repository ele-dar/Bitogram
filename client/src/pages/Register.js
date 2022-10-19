import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Register = () => {
    const { setAlert } = useContext(MainContext)
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        photo: '',
        about: ''
    })
    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        axios.post('/api/users/register', formData)
            .then(resp => {
                navigate('/')
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }

    return (
        <main className='text-center my-5 container form-signin' style={{ maxWidth: '20rem' }}>
            <form onSubmit={handleSubmit}>
                <h1 className='h3 mb-3 fw-normal'>Naujas vartotojas</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Username" name="username" onChange={(e) => handleForm(e)} />
                    <label >Vartotojo vardas</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={(e) => handleForm(e)} />
                    <label htmlFor="floatingPassword">El.paštas</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e) => handleForm(e)} />
                    <label >Slaptažodis</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="About" name="about" onChange={(e) => handleForm(e)} />
                    <label >Aprašymas</label>
                </div>
                <div>
                    <input type="file" className="form-control" placeholder="Nuotrauka" name="photo" onChange={(e) => handleForm(e)} />
                </div>
                <button className="mt-3 w-100 btn btn-lg btn-secondary" type="submit">Tęsti</button>
            </form>
        </main>
    )
}

export default Register
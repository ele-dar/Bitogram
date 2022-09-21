import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'
import deafultUser from '../images/default-user.svg'

const UserEdit = () => {
    const { setAlert, userInfo } = useContext(MainContext)
    const [form, setForm] = useState({
        username: '',
        email: '',
        photo: '',
        about: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/users/single/' + userInfo.id)
            .then(resp => setForm(resp.data))
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }, [])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        axios.put('/api/users/edit/' + userInfo.id, formData)
            .then(resp => {
                navigate('/profile/')
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }

    return (
        <main className='text-center my-5 container form-signin' style={{ maxWidth: '20rem' }}>
            <form onSubmit={handleSubmit}>
                <h1 className='h3 mb-3 fw-normal'>Atnaujinti savo profilio informaciją:</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Username" name="username" onChange={(e) => handleForm(e)} value={form.username} />
                    <label >Vartotojo vardas</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={(e) => handleForm(e)} value={form.email} />
                    <label htmlFor="floatingPassword">El.paštas</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="About" name="about" onChange={(e) => handleForm(e)} value={form.about} />
                    <label >Aprašymas</label>
                </div>
                <div className='d-flex gap-2' >
                    <img src={form.photo ? form.photo : deafultUser} alt="user" style={{ maxWidth: '2rem' }} />
                    <input type="file" className="form-control" placeholder="Photo" name="photo" onChange={(e) => handleForm(e)} />
                </div>
                <button className="mt-3 w-100 btn btn-lg btn-secondary" type="submit">Tęsti</button>
            </form>
        </main>
    )
}

export default UserEdit
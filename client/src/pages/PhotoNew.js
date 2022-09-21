import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const PhotoNew = () => {
    const { setAlert, userInfo } = useContext(MainContext)
    const [form, setForm] = useState({
        photo: '',
        caption: '',
        userId: userInfo.id
    })
    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedForm = new FormData()

        for (const key in form) {
            formattedForm.append(key, form[key])
        }

        axios.post('/api/photos/', formattedForm)
            .then(resp => {
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
                <h1 className='h3 mb-3 fw-normal'>Pridėti naują nuotrauką</h1>
                <div>
                    <input type="file" className="form-control" placeholder="Photo" name="photo" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Username" name="caption" onChange={(e) => handleForm(e)} />
                    <label >Aprašymas</label>
                </div>
                <button className="mt-3 w-100 btn btn-lg btn-secondary" type="submit">Išsaugoti</button>
            </form>
        </main>
    )
}

export default PhotoNew
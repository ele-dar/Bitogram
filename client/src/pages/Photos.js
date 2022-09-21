import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'
import defaultUser from '../images/default-user.svg'
import { FaComment, FaHeart } from 'react-icons/fa'

const Photos = () => {
    const { alert, setAlert } = useContext(MainContext)
    const [photos, setPhotos] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/photos')
            .then(resp => setPhotos(resp.data))
            .catch(e => {
                setAlert({ status: 'danger', message: e.response.data })
                if (e.response.status === 401) {
                    setTimeout(() => { navigate('/') }, 1000)
                }
            })
    }, [])

    return (
        <>
            {photos &&
                <ul className='p-3 mb-0' style={{ listStyle: 'none' }}>
                    {photos.map(photo =>
                        <li key={photo.id} className='mb-4'>
                            <div><img src={photo.user.photo || defaultUser} alt={photo.user.username} className='rounded-circle me-2' style={{ maxWidth: '2rem' }} /><b>{photo.user.username}</b></div>
                            <Link to={'/photos/' + photo.id}>
                                <img src={photo.photo} alt={photo.id} className='w-100 mt-2 rounded' />
                            </Link>
                            <div className='d-flex gap-3'>
                                <div className='me-auto'>{photo.caption && <><b>{photo.user.username}</b> <span>{photo.caption}</span></>}</div>
                                <div className='d-flex align-items-center gap-1'><FaHeart /> {photo.likes.length}</div>
                                <div className='d-flex align-items-center gap-1'><FaComment />{photo.comments.length}</div>
                            </div>
                        </li>
                    )}
                </ul>
            }
        </>
    )
}

export default Photos
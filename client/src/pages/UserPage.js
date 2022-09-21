import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'
import defaultUser from '../images/default-user.svg'
import { FaComment, FaHeart } from 'react-icons/fa'

const UserPage = () => {
    const { id } = useParams()
    const { setAlert } = useContext(MainContext)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/users/single/' + id)
            .then(resp => setUser(resp.data))
            .catch(e => {
                setAlert({ status: 'danger', message: e.response.data })
                if (e.response.status === 401) {
                    setTimeout(() => { navigate('/') }, 1000)
                }
            })
    }, [])

    return (
        <>
            <div className='d-flex align-items-center p-3 border-bottom'>
                <img src={user.photo ? user.photo : defaultUser} alt='User' className='me-3 rounded-circle' style={{ maxWidth: '5rem' }} />
                <div className='me-auto'>
                    <h4 >{user.username}</h4>
                    {user.about &&
                        <div>Apie mane: {user.about}</div>
                    }
                </div>
            </div>

            {user.photos ?
                <ul className='p-3' style={{ listStyle: 'none' }}>
                    {user.photos.map(photo =>
                        <li key={photo.id} className='mb-4'>
                            <Link to={'/photos/' + photo.id} className='link-unstyled'>
                                <img src={photo.photo} alt={photo.id} className='w-100 rounded' />
                            </Link>
                            <div className='d-flex gap-3'>
                                <div className='me-auto'>{photo.caption && <><b>{user.username}</b> <span>{photo.caption}</span></>}</div>
                                <div className='d-flex align-items-center gap-1'><FaHeart /> {photo.likes.length}</div>
                                <div className='d-flex align-items-center gap-1'><FaComment />{photo.comments.length}</div>
                            </div>
                        </li>
                    )}
                </ul>
                : <div>{user.username} dar neįkėlė nė vienos nuotraukos...</div>}
        </>
    )
}

export default UserPage
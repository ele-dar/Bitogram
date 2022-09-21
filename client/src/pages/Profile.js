import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'
import defaultUser from '../images/default-user.svg'
import { FaUserEdit, FaComment, FaHeart } from 'react-icons/fa'

const UserPage = () => {
    const { setAlert, userInfo } = useContext(MainContext)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/users/single/' + userInfo.id)
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
                {userInfo.id === user.id &&
                    <Link to='/profile/edit' className='nav-link fs-2'><FaUserEdit /></Link>
                }
            </div>

            {user.photos ?
                <ul className='p-3' style={{ listStyle: 'none' }}>
                    {user.photos.map(photo =>
                        <li key={photo.id} className='mb-4'>
                            <Link to={'/photos/' + photo.id} className='link-unstyled'>
                                <img src={photo.photo} alt={photo.id} className='w-100 rounded' />
                            </Link>
                            <div className='d-flex gap-3'>
                                <div className='me-auto'><b>{user.username}</b> {photo.caption}</div>
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
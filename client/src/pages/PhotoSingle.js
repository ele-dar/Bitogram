import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MainContext from "../context/MainContext"
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import defaultUser from '../images/default-user.svg'

const PhotoSingle = () => {
    const { id } = useParams()
    const { alert, setAlert, userInfo } = useContext(MainContext)
    const navigate = useNavigate()
    const [photo, setPhoto] = useState({})
    const [isLiked, setIsLiked] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [comment, setComment] = useState('')

    useEffect(() => {
        axios.get('/api/photos/' + id)
            .then(resp => {
                setPhoto(resp.data)
                if (resp.data.likes.find(like => like.userId == userInfo.id)) setIsLiked(true)
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
                if (e.response.status === 401) {
                    setTimeout(() => { navigate('/') }, 1000)
                }
            })
    }, [refresh])

    const handleLike = () => {
        axios.post('/api/likes/', { photoId: photo.id, userId: userInfo.id })
            .then(resp => {
                setRefresh(!refresh)
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }

    const handleRemoveLike = () => {
        const likeId = photo.likes.find(like => like.userId == userInfo.id).id
        axios.delete('/api/likes/' + likeId)
            .then(resp => {
                setIsLiked(false)
                setRefresh(!refresh)
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }

    const handleComment = (e) => {
        e.preventDefault()
        axios.post('/api/comments/', { comment, photoId: photo.id, userId: userInfo.id })
            .then(resp => {
                setRefresh(!refresh)
                setComment('')
            })
            .catch(e => {
                console.log(e)
                setAlert({ status: 'danger', message: e.response.data })
            })
    }

    return (
        <>
            {photo.id &&
                <div className='p-3 mb-0'>
                    <div><img src={photo.user.photo || defaultUser} alt={photo.user.username} className='rounded-circle me-2' style={{ maxWidth: '2rem' }} /><b>{photo.user.username}</b></div>
                    <img src={photo.photo} alt={photo.id} className='w-100 mt-2 rounded' />
                    <div className='d-flex gap-3'>
                        <div className='me-auto'>{photo.caption && <><b>{photo.user.username}</b> <span>{photo.caption}</span></>}</div>
                        <div className='d-flex align-items-center gap-1'>
                            {isLiked ? <FaHeart className="text-danger" onClick={handleRemoveLike} /> : <FaRegHeart onClick={handleLike} />}
                            {photo.likes.length}
                        </div>
                        <div className='d-flex align-items-center gap-1'><FaRegComment />{photo.comments.length}</div>
                    </div>
                    {photo.comments && photo.comments.map(comment => <div key={comment.id} className='mt-2'><b>{comment.user.username}</b> {comment.comment}</div>)}
                    <form className='d-flex align-items-center mt-3' onSubmit={handleComment}>
                        <img src={userInfo.photo || defaultUser} alt={userInfo.username} className='rounded-circle me-2' style={{ maxWidth: '2rem' }} />
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Add comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <button className="btn btn-outline-secondary" type="submit"><FiSend /></button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default PhotoSingle
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'
import defaultUser from '../images/default-user.svg'

const Search = () => {
    const { setAlert, searchInput, setSearchInput } = useContext(MainContext)
    const navigate = useNavigate()
    const [searchOutput, setSearchOutput] = useState([])

    useEffect(() => {
        if (searchInput)
            axios.get('/api/users/search/' + searchInput)
                .then(resp => setSearchOutput(resp.data))
                .catch(e => {
                    console.log(e)
                    setAlert({ status: 'danger', message: e.response.data })
                    if (e.response.status === 401) {
                        setTimeout(() => { navigate('/') }, 1000)
                    }
                })
    }, [searchInput])

    return (
        <>
            <input type="text" className="form-control mt-2" placeholder='Vartotojo paieška' onChange={(e) => setSearchInput(e.target.value)} />
            {searchInput &&
                <div className='container p-0'>
                    {searchOutput.length > 0 ?
                        <ul className="list-group list-group-flush mt-1">
                            {searchOutput.map(user =>
                                <Link to={'/user/' + user.id} key={user.id} className="list-group-item list-group-item-action">
                                    <div><img src={user.photo || defaultUser} alt={user.username} className='rounded-circle me-2' style={{ maxWidth: '2rem' }} /><b>{user.username}</b></div>
                                </Link>
                            )}
                        </ul>
                        :
                        <div className='m-1'>Toks vartotojas nerastas</div>
                    }
                </div>

            }
        </>
    )
}

export default Search
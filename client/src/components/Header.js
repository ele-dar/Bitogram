import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../context/MainContext'
import Search from './Search'
import { FiPlusSquare, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiSearch } from 'react-icons/hi'


const Header = () => {
    const { isLoggedin, setSearchInput, isSearchClicked, setIsSearchClicked } = useContext(MainContext)

    return (
        <>
            <header className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom ">
                <Link to='/photos' className="nav-link"><h1 className='mb-0'>Bitogram</h1></Link>
                {isLoggedin ?
                    <>
                        <ul className="nav nav-pills fs-2 align-items-center">
                            <div className=''>
                                {isSearchClicked ?
                                    <li className="nav-item nav-link text-secondary" onClick={() => { setIsSearchClicked(false); setSearchInput('') }}><HiSearch /></li>
                                    : <li className="nav-item nav-link text-dark" onClick={() => { setIsSearchClicked(true) }}><HiSearch /></li>
                                }
                            </div>

                            <li className="nav-item"><Link to='/photos/new' className="nav-link text-dark"><FiPlusSquare /></Link></li>
                            <li className="nav-item"><Link to='/profile' className="nav-link text-dark"><FaRegUserCircle /></Link></li>
                            <li className="nav-item "><Link to='/logout' className="nav-link text-dark pe-0"><FiLogOut /></Link></li>
                        </ul>
                        {isSearchClicked && <Search />}
                    </>
                    :
                    <ul className="nav nav-pills fs-2">
                        <li className="nav-item"><Link to='/' className="nav-link text-dark"><FiLogIn /></Link></li>
                        <li className="nav-item"><Link to='/register' className="nav-link text-dark pe-0"><FiUserPlus /></Link></li>
                    </ul>

                }
            </header>
        </>
    )
}

export default Header
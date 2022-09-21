import { useContext, useEffect } from "react"
import MainContext from "../context/MainContext"

const Alert = () => {
    const { alert, setAlert } = useContext(MainContext)

    useEffect(() => {
        if (alert.message === '') return
        setTimeout(() => {
            setAlert({ message: '' })
        }, 2000)
    }, [alert])

    return alert.message && <div className={'mt-2 p-2 alert fw-bold text-' + alert.status + ' border-' + alert.status}>{alert.message}</div>
}

export default Alert
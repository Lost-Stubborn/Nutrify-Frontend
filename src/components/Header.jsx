import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

function Header() {

    const loggedData = useContext(UserContext)

    function logout() {
        localStorage.removeItem("nutrify-user")
        loggedData.setLoggedUser(null)
        navigate("/login")
    }


    return (
        <div>
            <ul>
                <Link to='/track'><li>Track</li></Link>
                <Link to='/diet'><li>Diet</li></Link>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}

export default Header
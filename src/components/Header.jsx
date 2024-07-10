import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

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
                <li>Home</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    )
}

export default Header
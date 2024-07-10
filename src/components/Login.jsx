import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

function Login() {

    const loggedData = useContext(UserContext)

    const navigate = useNavigate()

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: ""
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "dummy text"
    })


    function handleInput(event) {
        setUserCreds((prevState) => {
            return {...prevState, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(userCreds)

        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => {

            if(response.status === 404) {
                setMessage({type: "error", text: "Username or Email dosen't exist."})
            }
            else if(response.status === 403) {
                setMessage({type: "error", text: "Incorrect Password."})
            }

            setTimeout(() => {
                setMessage({type: "invisible-msg", text: "dummy text"})
            }, 5000)

            return response.json()

        })
        .then((data) => {
            
            if(data.token !== undefined) {
                localStorage.setItem("nutrify-user", JSON.stringify(data))

                loggedData.setLoggedUser(data)

                navigate("/track")
            }
            

        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        
        <section className="container">
            
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login to Fitness</h1>

                <input className="inp" type="email" required onChange={handleInput}
                placeholder="Enter email" name="email" value={userCreds.email}/>
                <input className="inp" type="password" maxLength={8} required onChange={handleInput}
                placeholder="Enter Password" name="password" value={userCreds.password}/>

                <button className="btn">Login</button>

                <p>Don't have an account ? <Link to="/register">Register Now</Link></p>
                <p className={message.type}>{message.text}</p>
            </form>

        </section>

    )
}

export default Login
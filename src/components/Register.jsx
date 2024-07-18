import { useState } from "react"
import { Link } from "react-router-dom"

function Register() {
    
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "dummy text"
    })
    
    function handleInput(event) {
        setUserDetails((prevState) => {
            return {...prevState, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(userDetails)

        fetch("https://nutrify-api-kappa.vercel.app/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            
            setMessage({type: "success", text: data.message})
            
            setUserDetails({
                name: "",
                email: "",
                password: "",
                age: ""
            })

            setTimeout(() => {
                setMessage({type: "invisible-msg", text: "Dummy text"})        
            }, 5000)
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        
        <section className="container">
            
            <form className="form" onSubmit={handleSubmit}>
                <h1>Start Your Fitness</h1>

                <input className="inp" type="text" required onChange={handleInput}
                placeholder="Enter Name" name="name" value={userDetails.name}/>
                <input className="inp" type="email"  required onChange={handleInput} 
                placeholder="Enter email" name="email" value={userDetails.email}/>
                <input className="inp" type="password" required onChange={handleInput}
                placeholder="Enter Password" name="password" value={userDetails.password}/>
                <input className="inp" type="number" required  onChange={handleInput} maxLength={8}
                placeholder="Enter Age" name="age" min={12} max={100} value={userDetails.age}/>

                <button className="btn">Join</button>
                <p>Already Registed? <Link to="/login">Login</Link></p>

                <p className={message.type}>{message.text}</p>
            </form>

        </section>

    )
}

export default Register
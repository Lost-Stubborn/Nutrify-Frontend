import { Link } from "react-router-dom"

function Notfound() {
    return (
        <section className="container">
            <div className="not-found">
                <h1>404 | Not Found</h1>
                <p><Link to="/register">Register</Link> Now to use.</p>
            </div>
        </section>
    )
}

export default Notfound
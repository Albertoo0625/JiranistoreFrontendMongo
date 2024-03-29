import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section style={{color:"white"}}>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/home">Home</Link>
            <br />
            <Link to="/seller">Seller Page</Link>
            <br />
            <Link to="/admin">Admin Page</Link>
            <br />
        </section>
    )
}

export default LinkPage

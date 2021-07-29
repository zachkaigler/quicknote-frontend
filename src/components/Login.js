import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { ThreeDots } from "react-loading-icons"
import { baseUrl } from "../baseurl"
import logo from "../images/logo-large.png"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [wasClicked, setWasClicked] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setWasClicked(true)
        fetch(`${baseUrl}/users/signin`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.error) {
                setError(true)
            } else {
                localStorage.qnToken = data.token
                localStorage.qnTheme = data.result.theme
                dispatch({type: "SET_USER", payload: data.result})
                dispatch({type: "SET_NOTES", payload: data.result.notes})
                history.push("/notes")
            }
        })
    }

    return (
        <div className={ localStorage.qnTheme ? localStorage.qnTheme === undefined ? "login-dark" : `login-${localStorage.qnTheme}` : "login-dark" }>
            <img src={logo} alt="quicknote" />
            { error ? <p>Incorrect email or password.</p> : null }
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <input placeholder="Password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <button type="submit" id="login">{ wasClicked ? <ThreeDots fill="#ac6767" height=".5rem" /> : "Log In"}</button>
            </form>
            <button id="signup" onClick={() => history.push("/signup")}>Sign Up</button>
        </div>
    )
}

export default Login

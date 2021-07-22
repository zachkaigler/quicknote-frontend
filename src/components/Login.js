import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { baseUrl } from "../baseurl"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
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
                console.log(data.error)
            } else {
                localStorage.qnToken = data.token
                dispatch({type: "SET_USER", payload: data.result})
                dispatch({type: "SET_NOTES", payload: data.result.notes})
                history.push("/notes")
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="Password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login

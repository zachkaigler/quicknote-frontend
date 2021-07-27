import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { baseUrl } from "../baseurl"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [passError, setPassError] = useState(false)
    const [acctError, setAcctError] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        setPassError(false)
        setAcctError(false)
        if (pass1 !== pass2) {
            setPassError(true)
        } else {
            fetch(`${baseUrl}/users/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: pass1,
                    firstName: firstName,
                    lastName: lastName
                })
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.error) {
                    setAcctError(true)
                } else {
                    localStorage.qnToken = data.token
                    dispatch({type: "SET_USER", payload: data.user})
                    dispatch({type: "SET_NOTES", payload: data.user.notes})
                    history.push("/notes")
                }
            })
        }
    }

    return (
        <div className={ localStorage.qnTheme ? localStorage.qnTheme === undefined ? "signup-dark" : `signup-${localStorage.qnTheme}` : "signup-dark" }>
            <form onSubmit={handleSubmit}>
                <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <input required type="password" placeholder="Password" value={pass1} onChange={(e) => setPass1(e.target.value)}/><br/>
                <input required type="password" placeholder="Confirm Password" value={pass2} onChange={(e) => setPass2(e.target.value)}/><br/>
                <input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br/>
                <input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={() => history.push("/")}>Back</button>
            { passError ? <p>Passwords must match.</p> : null}
            { acctError ? <p>Account with this email already exists.</p> : null}
        </div>
    )
}

export default Signup

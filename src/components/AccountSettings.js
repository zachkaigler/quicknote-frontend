import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl } from "../baseurl"

const AccountSettings = ({ setAcctSettingsVis }) => {
    const user = useSelector(state => state.userReducer.user)
    const [acctError, setAcctError] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [theme, setTheme] = useState(user.theme)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        setAcctError(false)
        fetch(`${baseUrl}/users/${user._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                theme: theme
            })
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.error) {
                setAcctError(true)
            } else {
                localStorage.qnTheme = theme
                dispatch({type: "SET_USER", payload: data.user})
                if (user === data) {
                    setAcctSettingsVis(false)
                }
            }
        })
    }

    return (
        <div className="acct-settings">
            <h1>Account Settings</h1>
            <form onSubmit={handleSubmit}>
                <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br/>
                <input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
                <h2>Theme</h2>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                <br/>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => setAcctSettingsVis(false)}>Cancel</button>
            { acctError ? <p>Account with this email already exists.</p> : null}
        </div>
    )
}

export default AccountSettings

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { baseUrl } from "../baseurl"

const Notebook = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.userReducer.user)
    const notes = useSelector(state => state.userReducer.notes)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            if (localStorage.qnToken) {
                console.log(localStorage.qnUserId)
                fetch(`${baseUrl}/users/authenticate`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer: ${localStorage.qnToken}`
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                        if (data.error) {
                            console.log(data.error)
                        } else {
                            dispatch({type: "SET_USER", payload: data.result})
                            dispatch({type: "SET_NOTES", payload: data.result.notes})
                            setIsLoaded(true)
                        }
                    }
                )
            } else {
                return <Redirect to="/"/>
            }
        } else {
            setIsLoaded(true)
        }
    }, [user, dispatch])

    if (isLoaded) {
        // Break into component later on
        const noteCards = notes.map((note) => {
            return (
                <div key={note._id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            )
        })
    
        return (
            <div>
                <h1>Hello, {user.firstName}</h1>
                <div>
                    {noteCards}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Notebook

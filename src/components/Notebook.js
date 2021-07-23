import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const Notebook = () => {
    const user = useSelector(state => state.userReducer.user)
    const notes = useSelector(state => state.userReducer.notes)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = () => {
        localStorage.clear()
        dispatch({type: "SET_USER", payload: null})
        history.push("/")
    }
  
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
            <button onClick={handleClick}>Log Out</button>
        </div>
    )
  
}

export default Notebook

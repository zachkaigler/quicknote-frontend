import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { firstNote } from "../firstnote"
import logo from "../images/logo-large.png"
import Notecard from "./Notecard"

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

    let dispNotes
    if (!user.fnd) {
        dispNotes = [firstNote, ...notes]
    } else {
        dispNotes = [...notes]
    }

    const pinnedNotes = dispNotes.filter((note) => note.pinned)
    const pinnedNotecards = pinnedNotes.map((note) => {
        return <Notecard
                    key={note._id}
                    title={note.title}
                    date={note.date}
                    content={note.content}
                    color={note.color}
                    id={note._id}
              />
    })

    const unpinnedNotes = dispNotes.filter((note) => !note.pinned)
    const unpinnedNotecards = unpinnedNotes.map((note) => {
        return <Notecard
                    key={note._id}
                    title={note.title}
                    date={note.date}
                    content={note.content}
                    color={note.color}
                    id={note._id}
              />
    }) 

    return (
        <div className="notebook-dark">
            <div className="column-left">
                <img src={logo} alt="quicknote" style={{ height: "200px"}}/>
                <h1>Hello, {user.firstName}</h1>
                <button id="new-note"><span>+</span> New Note</button>
                <button>Account Settings</button>
                <button onClick={handleClick}>Log Out</button>
            </div>
            <div className="main-content">
                <div className="main-content-top">
                    <input placeholder="Search notes..." />
                </div>
                <div className="pinned">
                    <h3>Pinned</h3>
                    <div className="note-container">
                        {pinnedNotecards}
                    </div>
                </div>
                <div className="unpinned">
                    <div className="note-container">
                        {unpinnedNotecards}
                    </div>
                </div>
            </div>
        </div>
    )
  
}

export default Notebook

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AiFillDelete, AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"
import { baseUrl } from "../baseurl"

const Notecard = ({ title, date, content, color, pinned, id }) => {
    const [taskBarVis, setTaskBarVis] = useState(false)
    const notes = useSelector(state => state.userReducer.notes)
    const dispatch = useDispatch()

    // Add fetch requests for delete action
    const handleDelete = () => {
        dispatch({type: "SET_NOTES", payload: notes.filter((note) => note._id !== id )})
    }

    const handlePin = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: color,
            pinned: true,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                pinned: true
            })
        })
    }

    const handleUnpin = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: color,
            pinned: false,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                pinned: false
            })
        })
    }

    const handleWhite = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: "white",
            pinned: pinned,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                color: "white"
            })
        })
    }

    const handleRed = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: "red",
            pinned: pinned,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                color: "red"
            })
        })
    }

    const handleGreen = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: "green",
            pinned: pinned,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                color: "green"
            })
        })
    }

    const handleBlue = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: "blue",
            pinned: pinned,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                color: "blue"
            })
        })
    }

    const handleYellow = () => {
        const updatedNote = {
            title: title,
            date: date,
            content: content,
            color: "yellow",
            pinned: pinned,
            _id: id
        }
        dispatch({type: "SET_NOTES", payload: notes.map((note) => {
            if (note._id === id) {
                return updatedNote
            } else {
                return note
            }
        })})
        fetch(`${baseUrl}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.qnToken}`
            },
            body: JSON.stringify({
                color: "yellow"
            })
        })
    }

    return (
        <div className={`notecard ${color}`} onMouseOver={() => setTaskBarVis(true)} onMouseLeave={() => setTaskBarVis(false)}>
            <div className="notecard-content">
                <div className="notecard-title"><h2>{title}</h2> { pinned ? <AiFillPushpin className="icon" onClick={handleUnpin}/> : <AiOutlinePushpin className="icon" onClick={handlePin}/> } </div>
                <h3>{date}</h3>
                <p>{content}</p>
            </div>
            <div className="taskbar-container">
                { taskBarVis ? 
                    <div className="notecard-taskbar">
                        <AiFillDelete className="icon" onClick={handleDelete}/>
                        <div className="colors">
                            <div className="white circle" onClick={handleWhite}></div>
                            <div className="red circle" onClick={handleRed}></div>
                            <div className="green circle" onClick={handleGreen}></div>
                            <div className="blue circle" onClick={handleBlue}></div>
                            <div className="yellow circle" onClick={handleYellow}></div>
                        </div>
                    </div> : null }
            </div>
        </div>
    )
}

export default Notecard

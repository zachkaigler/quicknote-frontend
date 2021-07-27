import { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { AiFillDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl } from '../baseurl'

const NoteModal = ({ isOpen, setIsOpen, activeNote, setActiveNote }) => {
    const [title, setTitle] = useState(activeNote ? activeNote.title : "")
    const [content, setContent] = useState(activeNote ? activeNote.content : "")
    const notes = useSelector(state => state.userReducer.notes)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setTitle(activeNote ? activeNote.title : "")
        setContent(activeNote ? activeNote.content : "")
    }, [activeNote])

    const modalRef = useRef()

    const resetModal = () => {
        setIsOpen(false)
        setActiveNote(null)
    }

    const handleCancelNote = () => {
        setTitle("")
        setContent("")
        resetModal()
    }

    const handleClose = (e) => {
        if (modalRef.current === e.target) {
            let theNote
            if (activeNote) {
                theNote = {
                    title: title,
                    date: new Date().toLocaleString(),
                    content: content,
                    color: activeNote.color,
                    pinned: activeNote.pinned,
                    _id: activeNote._id
                }
                if (theNote.content !== activeNote.content || theNote.title !== activeNote.title) {
                    dispatch({type: "SET_NOTES", payload: notes.map((note) => {
                        if (note._id === theNote._id) {
                            return theNote
                        } else {
                            return note
                        }
                    })})
                    fetch(`${baseUrl}/notes/${theNote._id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "Authorization": `Bearer: ${localStorage.qnToken}`
                        },
                        body: JSON.stringify(theNote)
                    })
                } else {
                    console.log("note unchanged")
                }
            } else if (!activeNote && title === "" && content === "") {
                handleCancelNote()
            } else {
                theNote = {
                    title: title,
                    date: new Date().toLocaleString(),
                    content: content,
                    color: "white",
                    pinned: false,
                    user: user._id
                }
                fetch(`${baseUrl}/notes`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer: ${localStorage.qnToken}`
                    },
                    body: JSON.stringify(theNote)
                })
                .then(res => res.json())
                .then((newNote) => dispatch({type: "SET_NOTES", payload: [newNote, ...notes]})) 
            }
            resetModal()
        } 
    }

    const handleDeleteNote = () => {
        dispatch({type: "SET_NOTES", payload: notes.filter((note) => note._id !== activeNote._id )})
        fetch(`${baseUrl}/notes/${activeNote._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer: ${localStorage.qnToken}`
            }
        })
        setTitle("")
        setContent("")
        resetModal()
    }

    const anim = useSpring({
        config: {
            duration: 200
        },
        opacity: isOpen ? 1 : 0
    })

    if (isOpen) {
        return(
            <div className="modal-bg" ref={modalRef} onClick={handleClose}>
                <animated.div style={anim}>
                    <div className={`modal ${activeNote ? null : "new-note"}`}>
                        <form>
                            <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                            <textarea value={content} placeholder="Content" onChange={(e) => setContent(e.target.value)}/>
                        </form>
                        <AiFillDelete className="modal-delete" onClick={ activeNote ? handleDeleteNote : handleCancelNote }/>
                    </div>
                </animated.div>
            </div>
        )
    } else {
        return null
    }
}

export default NoteModal

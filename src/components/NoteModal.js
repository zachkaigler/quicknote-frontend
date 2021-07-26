import { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { AiFillDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl } from '../baseurl'

const NoteModal = ({ isOpen, setIsOpen, activeNote, setActiveNote }) => {
    const [title, setTitle] = useState(activeNote ? activeNote.title : "")
    const [content, setContent] = useState(activeNote ? activeNote.content : "")
    const notes = useSelector(state => state.userReducer.notes)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setTitle(activeNote ? activeNote.title : "")
        setContent(activeNote ? activeNote.content : "")
    }, [activeNote])

    const modalRef = useRef()

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
                console.log(theNote.content.split(" "))
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
            } else {
                theNote = {}
            }
            setIsOpen(false)
            setActiveNote(null)
        } 
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
                    <div className="modal">
                        <form>
                            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
                        </form>
                        <AiFillDelete className="modal-delete"/>
                    </div>
                </animated.div>
            </div>
        )
    } else {
        return null
    }
}

export default NoteModal

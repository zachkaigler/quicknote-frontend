import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useSpring, animated } from 'react-spring'
import logo from "../images/logo-large.png"
import AccountSettings from "./AccountSettings"
import Notecard from "./Notecard"
import NoteModal from "./NoteModal"

const Notebook = () => {
    const [acctSettingsVis, setAcctSettingsVis] = useState(false)
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [activeNote, setActiveNote] = useState(null)
    const user = useSelector(state => state.userReducer.user)
    const notes = useSelector(state => state.userReducer.notes)
    const dispatch = useDispatch()
    const history = useHistory()

    const anim = useSpring({
        config: {
            duration: 200
        },
        filter: isOpen ? `blur(5px)` : `blur(0px)`,
    })

    const handleClick = () => {
        localStorage.removeItem("qnToken")
        dispatch({type: "SET_USER", payload: null})
        history.push("/")
    }

    const dispNotes = notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.content.toLowerCase().includes(query.toLowerCase()) || note.date.toLowerCase().includes(query.toLowerCase()))

    const pinnedNotes = dispNotes.filter((note) => note.pinned)
    const pinnedNotecards = pinnedNotes.map((note) => {
        return <Notecard
                    key={note._id}
                    title={note.title}
                    date={note.date}
                    content={note.content}
                    color={note.color}
                    pinned={note.pinned}
                    id={note._id}
                    note={note}
                    setActiveNote={setActiveNote}
                    setIsOpen={setIsOpen}
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
                    pinned={note.pinned}
                    id={note._id}
                    note={note}
                    setActiveNote={setActiveNote}
                    setIsOpen={setIsOpen}
              />
    }) 

    if (!acctSettingsVis) {
        return (
                <div className={`notebook-${user.theme}`}>
                    <NoteModal isOpen={isOpen} setIsOpen={setIsOpen} activeNote={activeNote} setActiveNote={setActiveNote}/>
                    <animated.div className="column-left" style={anim}>
                            <div className="top">
                                <img src={logo} alt="quicknote" style={{ height: "200px" }}/>
                                <h1>Hello, {user.firstName}</h1>
                                <button id="new-note" onClick={(e) => setIsOpen(true)}><span>+</span> New Note</button>
                            </div>
                            <div className="bottom">
                                <button onClick={() => setAcctSettingsVis(true)}>Account Settings</button>
                                <button onClick={handleClick}>Log Out</button>
                            </div>
                    </animated.div>
                    <animated.div className="main-content" style={anim}>
                        <div className="main-content-top">
                            <input placeholder="Search notes..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                        </div>
                        <div className="pinned">
                            <h3 id="pinned">Pinned</h3>
                            <div className="note-container">
                                {pinnedNotecards}
                            </div>
                        </div>
                        <div className="unpinned">
                            <div className="note-container">
                                {unpinnedNotecards}
                            </div>
                        </div>
                    </animated.div>
                </div>
        )
    } else {
        return (
            <div className={`notebook-${user.theme}`}>
                <NoteModal isOpen={isOpen} setIsOpen={setIsOpen} activeNote={activeNote} setActiveNote={setActiveNote}/>
                <animated.div className="column-left" style={anim}>
                    <div className="top">
                        <img src={logo} alt="quicknote" style={{ height: "200px"}}/>
                        <h1>Hello, {user.firstName}</h1>
                        <button id="new-note" onClick={(e) => setIsOpen(true)}><span>+</span> New Note</button>
                    </div>
                    <div className="bottom">
                        <button onClick={() => setAcctSettingsVis(true)}>Account Settings</button>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                </animated.div>
                <animated.div className="main-content" style={anim}>
                    <AccountSettings setAcctSettingsVis={setAcctSettingsVis}/>
                </animated.div>
            </div>
        )
    }
}

export default Notebook

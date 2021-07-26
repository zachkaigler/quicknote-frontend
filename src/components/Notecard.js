import { useState } from "react"
import { AiFillDelete, AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"

const Notecard = ({ title, date, content, color, pinned }) => {
    const [taskBarVis, setTaskBarVis] = useState(false)

    const handleDelete = () => console.log("Note deleted")
    const handlePin = () => console.log("Note pinned")
    const handleUnpin = () => console.log("Note unpinned")

    return (
        <div className={`notecard ${color}`} onMouseOver={() => setTaskBarVis(true)} onMouseLeave={() => setTaskBarVis(false)}>
            <div className="notecard-content">
                <div className="notecard-title"><h2>{title}</h2> { pinned ? <AiFillPushpin className="icon" onClick={handleUnpin}/> : <AiOutlinePushpin className="icon" onClick={handlePin}/> } </div>
                <h3>{date}</h3>
                <p>{content}</p>
            </div>
            <div className="notecard-taskbar">
                { taskBarVis ? <AiFillDelete className="icon" onClick={handleDelete}/> : null }
            </div>
        </div>
    )
}

export default Notecard

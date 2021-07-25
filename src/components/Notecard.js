const Notecard = ({ title, date, content, color }) => {
    return (
        <div className={`notecard ${color}`}>
            <h2>{title}</h2>
            <h3>{date}</h3>
            <p>{content}</p>
        </div>
    )
}

export default Notecard

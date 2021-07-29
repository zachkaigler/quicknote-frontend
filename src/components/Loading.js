import { ThreeDots } from "react-loading-icons"

const Loading = () => {
    return (
        <div className={`loading-${localStorage.qnTheme ? localStorage.theme : "dark"}`}>
            <ThreeDots fill="#808080"/>
        </div>
    )
}

export default Loading

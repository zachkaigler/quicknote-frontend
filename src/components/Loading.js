import { ThreeDots } from "react-loading-icons"

const Loading = () => {
    return (
        <div className={`loading-${localStorage.qnTheme ? localStorage.qnTheme : "dark"}`}>
            <ThreeDots fill="#808080"/>
        </div>
    )
}

export default Loading

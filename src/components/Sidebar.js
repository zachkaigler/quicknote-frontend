import { useSelector, useDispatch } from "react-redux"
import { useSpring, animated } from 'react-spring'
import { useHistory } from "react-router-dom"
import logo from "../images/logo-large.png"
import ghLight from "../images/gh-light.png"
import ghDark from "../images/gh-dark.png"

const Sidebar = ({ setIsOpen, isOpen, setAcctSettingsVis }) => {
    const user = useSelector(state => state.userReducer.user)
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

    return (
        <animated.div className="column-left" style={anim}>
            <div className="top">
                <img src={logo} alt="quicknote"/>
                <h1>Hello, {user.firstName}</h1>
                <button id="new-note" onClick={() => setIsOpen(true)}><span>+</span> New Note</button>
            </div>
            <div className="bottom">
                <button onClick={() => setAcctSettingsVis(true)}>Account Settings</button>
                <button onClick={handleClick}>Log Out</button>
                <a href="https://github.com/zachkaigler/quicknote-frontend" target="_blank" rel="noreferrer"><img src={ user.theme === "dark" ? ghDark : ghLight } alt="github" className="github"/></a>
            </div>
        </animated.div>
    )
}

export default Sidebar

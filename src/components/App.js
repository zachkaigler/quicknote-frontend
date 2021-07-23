import "../styles/style.css"
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./Login"
import Notebook from "./Notebook"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { baseUrl } from "../baseurl"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const user = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
        if (localStorage.qnToken) {
            console.log(localStorage.qnUserId)
            fetch(`${baseUrl}/users/authenticate`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer: ${localStorage.qnToken}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        dispatch({type: "SET_USER", payload: data.result})
                        dispatch({type: "SET_NOTES", payload: data.result.notes})
                        setIsLoaded(true)
                    }
                }
            )
        } else {
            return <Redirect to="/"/>
        }
    } else {
      setIsLoaded(true)
    }
  }, [user, dispatch])

  if (!isLoaded) return null

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          { user ? <Redirect to="/notes"/> : <Login /> }
        </Route>
        <Route exact path="/notes">
          <Notebook />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

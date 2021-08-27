import { Switch, Route, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { baseUrl } from "../baseurl"
import Login from "./Login"
import Notebook from "./Notebook"
import Signup from "./Signup"
import Loading from "./Loading"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const user = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch()

  console.log(window.location.hostname)

  useEffect(() => {
    if (!user) {
        if (localStorage.qnToken) {
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
                        localStorage.clear()
                        setIsLoaded(true)
                        return <Redirect to="/"/>
                    } else {
                        dispatch({type: "SET_USER", payload: data.result})
                        dispatch({type: "SET_NOTES", payload: data.result.notes})
                        setIsLoaded(true)
                    }
                }
            )
        } else {
          setIsLoaded(true)
          return <Redirect to="/"/>
        }
    } else {
      setIsLoaded(true)
    }
  }, [user, dispatch])

  if (!isLoaded) return <Loading />

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          { user ? <Redirect to="/notes"/> : localStorage.qnToken ? <Loading /> : <Login /> }
        </Route>
        <Route exact path="/signup">
          { user ? <Redirect to="/notes"/> : <Signup /> }
        </Route>
        <Route exact path="/notes">
          { user ? <Notebook /> : <Redirect to="/"/> }
        </Route>
      </Switch>
    </div>
  );
}

export default App;

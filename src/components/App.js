import "../styles/style.css"
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./Login"
import Notebook from "./Notebook"
import { useSelector } from "react-redux"

function App() {
  const user = useSelector(state => state.userReducer.user)

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

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Weblayout from "./components/Weblayout";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Weblayout>
            <Route path="/" exact render={(props) => <Homepage />} />
          </Weblayout>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

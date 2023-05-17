import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Weblayout from "./components/Weblayout";
import Homepage from "./pages/Homepage";
import DashbboardLayout from "./components/DashbboardLayout";
import User from "./pages/admin/User";
import NoLayout from "./components/NoLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./assets/css/common.css";

function App() {
  const [dashboard, setDashboard] = useState(false);
  const [noLayoutPage, setNoLayout] = useState(false);

  function noLayout(location) {
    let noLayoutPages = ["login", "register"];
    let page = noLayoutPages.find((m) => location.includes(m));
    return page;
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (window.location.href.includes("admin")) {
      setDashboard(true);
    } else {
      let page = noLayout(window.location.href);
      if (page != null) {
        setNoLayout(true);
      } else {
        setDashboard(false);
      }
    }
  }, [window.location.href]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route
            path="/"
            exact
            render={(props) =>  <Weblayout {...props} ><Homepage /></Weblayout>}
            />
            <Route
            path="/admin/user"
            exact
            render={(props) =>  <DashbboardLayout {...props} ><User /></DashbboardLayout>}
            />
            <Route
            path="/login"
            exact
            render={(props) =>  <NoLayout {...props} ><Login /></NoLayout>}
            />
            <Route
            path="/register"
            exact
            render={(props) =>  <NoLayout {...props} ><Register /></NoLayout>}
            /> */}

          {dashboard === true ? (
            <DashbboardLayout> 
              <Route path="/admin/user"  render={(props) => <User />} />
            </DashbboardLayout>
          ) : noLayoutPage === true ? (
            <NoLayout>
              <Route path="/login"  render={(props) => <Login />} />
              <Route path="/register"  render={(props) => <Register />} />
            </NoLayout>
          ) : (
            <Weblayout>
              <Route path="/" exact render={(props) => <Homepage />} />
            </Weblayout>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

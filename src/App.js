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
import Profile from "./pages/Profile";
import FolderLayout from "./components/FolderLayout";
import AddFolder from "./pages/AddFolder";
import MainProvider from "./context/MainContext";
import { TailSpin } from "react-loader-spinner";
import FileDetail from "./components/FileDetail";
import ShareFile from "./components/ShareFile";
import DownloadFile from "./components/DownloadFile";
import Collection from "./pages/Collection";
import Permission from "./pages/admin/Permission";
import ShareFolder from "./components/ShareFolder";

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
        <MainProvider>
          <Switch>
            {dashboard === true ? (
              <DashbboardLayout>
                <Route path="/admin/user" render={(props) => <User />} />
                <Route path="/admin/permission" render={(props) => <Permission />} />
              </DashbboardLayout>
            ) : noLayoutPage === true ? (
              <NoLayout>
                <Route path="/login" render={(props) => <Login />} />
                <Route path="/register" render={(props) => <Register />} />
              </NoLayout>
            ) : (
              <Weblayout>
                <Route path="/" exact render={(props) => <Homepage />} />
                <Route path="/my-account" render={(props) => <Profile />} />
                <Route path="/folder" render={(props) => <FolderLayout />} />
                <Route path="/add-folder" render={(props) => <AddFolder />} />
                <Route path="/resource-detail" render={(props) => <FileDetail />} />
                <Route path="/resource-share" render={(props) => <ShareFile />} />
                <Route path="/folder-share" render={(props) => <ShareFolder />} />
                <Route path="/resource-download" render={(props) => <DownloadFile />} />
                <Route path="/my-collection" render={(props) => <Collection />} />
              </Weblayout>
            )}
          </Switch>
        </MainProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import "./App.css";
import Head from "./Component/Header/Head";
import SideBar from "./Component/Sidebar/SideBar";
import { Layout } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import Chat from "./Component/Chat/Chat";
import Login from "./Component/Login/Login";
import { useEffect } from "react";
import { auth } from "./firebase/util";
import { useStateValue } from "./redux/StateProvider";
import { actionTypes } from "./redux/reducer";
const { Content } = Layout;

const App = () => {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch({
          type: actionTypes.SET_USER,
          payload: userAuth,
        });
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      {!state.user ? (
        <Login />
      ) : (
        <>
          <Head />
          <div className="app__body">
            <Layout>
              <SideBar />

              <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ overflow: "initial" }}>
                  <Switch>
                    <Route exact path="/">
                      <h1 className="noMessage">Welcome</h1>
                    </Route>
                    <Route exact path="/room/:roomId">
                      <Chat />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;

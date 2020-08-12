import React from "react";
import "./App.css";
import Head from "./Component/Header/Head";
import SideBar from "./Component/Sidebar/SideBar";
import { Layout } from "antd";

const App = () => {
  return (
    <div>
      <Head />
      <div className="app__body">
        <Layout>
          <SideBar />
        </Layout>
      </div>
    </div>
  );
};

export default App;

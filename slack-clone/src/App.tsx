import React from "react";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";

function App() {
  return (
    <div className="flex">
      <Login />
      <SideBar />
      <ChatContainer/>
    </div>
  );
}

export default App;

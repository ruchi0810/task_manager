import * as React from "react";
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Task from "./Task";

function RoutesPath() {
  return (
    <Routes>
      <Route exact path="/">
        {/* {user && <Route path="/" exact element={<Home />} />} */}
        <Route path="/task" element={<Task />} />
        <Route exact path="/" element={<App />} />
      </Route>
    </Routes>
  );
}
export default RoutesPath;

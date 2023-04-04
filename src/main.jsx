import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/Pages/index";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";
import "./globals.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

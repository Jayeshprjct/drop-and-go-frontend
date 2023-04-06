import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/Pages/index";
import Login from "../src/Pages/Login";
import Signup from "../src/Pages/Signup";
import Loader from "../src/Pages/Loader";
import Dashboard from "../src/Pages/Dashboard";
import "./globals.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

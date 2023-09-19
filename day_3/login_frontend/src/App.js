import "./App.css";
// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login_Register/login";
import Forgot from "./Forgot_password/forgot";
import Home from "./Home/home";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/forgot"
            element={
              <>
                <Forgot />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

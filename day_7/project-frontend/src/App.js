import "./App.css";
// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login_Register/login";
import Forgot from "./Components/Forgot_password/forgot";
import MainPage from "./Components/HomePage/Main_Page/MainPage";
import { Onboarding } from "./Components/Onboarding/onboarding";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {theme} from "./Components/Navbar/Themes/theme";

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
             <ChakraProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <MainPage />
              </ChakraProvider>
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
        <Route
          path="/onboarding"
          element={
            <>
              <Onboarding />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

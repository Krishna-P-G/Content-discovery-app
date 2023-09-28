import "./App.css";
// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login_Register/login";
import Forgot from "./Components/Forgot_password/forgot";
import MainPage from "./Components/HomePage/Main_Page/MainPage";
import { Onboarding } from "./Components/Onboarding/onboarding";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {theme} from "./Components/Navbar/Themes/theme";
import Footer from "./Components/Navbar/Footer/Footer";
import Navbar from "./Components/Navbar/TopBar/Navbar";
import Privacy from "./Components/Navbar/Guidelines/privacy";
import Faq from "./Components/Navbar/Guidelines/Faq";
import Tac from "./Components/Navbar/Guidelines/Tac";

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
                <Navbar/>
                <MainPage />
                <Footer/>
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
        <Route
          path="/privacy"
          element={
            <>
              <Privacy />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <Faq />
            </>
          }
        />
        <Route
          path="/tac"
          element={
            <>
              <Tac />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

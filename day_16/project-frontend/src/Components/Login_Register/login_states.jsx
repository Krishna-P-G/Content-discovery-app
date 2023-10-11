import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userReducer";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Context = createContext();
export const States = ({ children }) => {
  const container = document.getElementById("container");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();
  
  function generateRandomOTP(length = 6) {
    const charset = "0123456789";
    let OTP = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      OTP += charset[randomIndex];
    }

    return OTP;
  }
  const code = generateRandomOTP();

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailValue) {
      setEmailError("Please enter your email");
      return false;
    } else if (!emailPattern.test(emailValue)) {
      setEmailError("Invalid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validateName = () => {
    if (!nameValue) {
      setNameError("Please enter your Username");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePassword = () => {
    const minLength = 6;
    const hasSymbol = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;
    const hasNumber = /\d/;

    if (!passwordValue) {
      setPasswordError("Please enter your password");
      return false;
    } else if (passwordValue.length < minLength) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else if (!hasSymbol.test(passwordValue)) {
      setPasswordError("Password must contain at least one symbol");
      return false;
    } else if (!hasNumber.test(passwordValue)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSignUp = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isNameValid = validateName();

    if (isPasswordValid && isEmailValid && isNameValid) {
      axios
        .post("http://localhost:8080/savedata", {
          username: nameValue,
          email: emailValue,
          password: passwordValue,
          code: code,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === " signup successfull") {
            toast.success("signup success");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else if (res.data === "Email & Username already exist") {
            toast.error("Email & Username already exist");
          } else if (res.data === " Email already exist") {
            toast.error(" Email already exist");
          } else if (res.data === " Username already exist") {
            toast.error("Username already exist");
          }
        });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (nameValue === "" || passwordValue === "") {
      toast.error("Enter all fields");
    } else {
      axios
        .get(
          `http://localhost:8080/login/loginbyusername/${nameValue}/${passwordValue}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === "login sucessfully") {
            toast.success(res.data);
            setTimeout(() => {
              dispatch(
                login({
                  username: nameValue,
                })
              );
              navigate("/home");
            }, 3000);
          } else {
            toast.error(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const togglePasswordVisibilitySignup = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const togglePasswordVisibilityLogin = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
      const signUpClickHandler = () => {
        setPasswordError("");
        setEmailError("");
        setNameError("");
        setPasswordVisibility(false);
        setEmailValue("");
        setPasswordValue("");
        container.classList.add("right-panel-active");
      };

      const signInClickHandler = () => {
        setPasswordError("");
        setEmailError("");
        setNameError("");
        setPasswordVisibility(false);
        setEmailValue("");
        setPasswordValue("");
        setNameValue("");
        container.classList.remove("right-panel-active");
      };

      signUpButton.addEventListener("click", signUpClickHandler);
      signInButton.addEventListener("click", signInClickHandler);

      // Clean up the event listeners when the component unmounts
      return () => {
        signUpButton.removeEventListener("click", signUpClickHandler);
        signInButton.removeEventListener("click", signInClickHandler);
      };
    }
  }, []);
  return (
  <Context.Provider value={{
    emailValue,
    setEmailValue,
    emailError,
    setEmailError,
    passwordValue,
    setPasswordValue,
    passwordError,
    setPasswordError,
    nameValue,
    setNameValue,
    nameError,
    setNameError,
    handleSignIn,
    handleSignUp,
    togglePasswordVisibilityLogin,
    togglePasswordVisibilitySignup
  }}>
    {children}
  </Context.Provider>);
};

export const useStates = () => useContext(Context);

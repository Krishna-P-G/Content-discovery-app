import "./login.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import facebook from "../../assets/facebook-icon.png";
import google from "../../assets/google-icon.png";
import twitter from "../../assets/twitter-icon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import akatsuki from "../../assets/akatsuki.png";
import eyes_closed from "../../assets/eyes-close.png";
import eyes_open from "../../assets/uchiha-eyes.png";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userReducer";


function Login() {
  
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
    <>
      <div className="doop">
        <div className="container" id="container">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className="form-container sign-up-container">
            <form
              action="#"
              className="Login-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="create_account">Create Account</h1>

              <div className="social-container-1">
                <img
                  src={facebook}
                  alt="facebook logo"
                  className="social rounded-circle"
                />
                <i className="fab fa-facebook-f"></i>
                <img
                  src={google}
                  alt="google logo"
                  className="social rounded-circle"
                />
                <i className="fab fa-google-plus-g"></i>
                <img
                  src={twitter}
                  alt="twitter logo"
                  className="social rounded-circle"
                />
                <i className="fab fa-twitter"></i>
              </div>

              <span className="registration-text">
                or use your email for registration
              </span>
              <input
                type="text"
                placeholder="Name"
                value={nameValue}
                className="signup-name"
                onChange={(e) => setNameValue(e.target.value)}
                required
              />
              <span className="error-message-1">{nameError}</span>
              <input
                type="email"
                placeholder="Email"
                value={emailValue}
                className="signup-email"
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
              <span className="error-message-2">{emailError}</span>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={passwordValue}
                className="signup-password"
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
              <img
                src={isPasswordVisible ? eyes_open : eyes_closed}
                alt="Toggle Password Visibility"
                className="toggle-visibility-icon-signup"
                onClick={togglePasswordVisibilitySignup}
              />
              <span className="error-message-3">{passwordError}</span>
              <button className="signupButton" onClick={handleSignUp}>
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form
              action="#"
              className="Login-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="signIn-account">Sign in</h1>
              <div className="social-container-2">
                <img
                  src={facebook}
                  alt="facebook logo"
                  className="social rounded-circle"
                />
                <i className="fab fa-facebook-f"></i>
                <img
                  src={google}
                  alt="google logo"
                  className="social rounded-circle"
                />
                <i className="fab fa-google-plus-g"></i>
                <img
                  src={twitter}
                  alt="twitter logo"
                  className="social rounded-circle"
                />
                <i className="fab fa-twitter"></i>
              </div>
              <span className="use-account">or use your account</span>
              <input
                type="text"
                placeholder="Name"
                value={nameValue}
                className="signin-name"
                onChange={(e) => setNameValue(e.target.value)}
                required
              />
              <span className="error-message-4">{emailError}</span>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={passwordValue}
                className="signin-password"
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
              <img
                src={isPasswordVisible ? eyes_open : eyes_closed}
                alt="Toggle Password Visibility"
                className="toggle-visibility-icon-login"
                onClick={togglePasswordVisibilityLogin}
              />
              <span className="error-message-5">{passwordError}</span>
              <Link to="/forgot">
                <span className="forgot-password">Forgot your password?</span>
              </Link>
              <button className="signInbtn" onClick={handleSignIn}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <img
                  src={akatsuki}
                  alt="product_logo"
                  className="akatsuki_logo"
                />
                <h1>Welcome Back!</h1>
                <p>Login into your account</p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <img
                  src={akatsuki}
                  alt="product_logo"
                  className="akatsuki_logo"
                />
                <h1>Don't have an account ?</h1>
                <p>Create a new account in a few seconds</p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="background-image"></div>
      </div>
    </>
  );
}

export default Login;

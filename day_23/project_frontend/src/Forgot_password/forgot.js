import "./forgot.css";
import { useState } from "react";
import axios from "axios";
import email from "../assets/email.png";
import password from "../assets/password.png";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import akatsuki from "../assets/akatsuki.png";
import eyes_closed from "../assets/eyes-close.png";
import eyes_open from "../assets/uchiha-eyes.png";
import { checkCode, updatePassword } from "../service/api";
import { getCode } from "../service/api";
import { changePassword } from "../service/api";

function Forgot() {
  const [emailValue, setEmailValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmVisible, setConfirmVisibility] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [message, setMessage] = useState(
    "Please enter your email for changing your password"
  );
  const navigate = useNavigate();

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

  const validateCode = () => {
    if (!codeValue) {
      setCodeError("Please enter verification code");
      return false;
    }
    setCodeError("");
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

  const validateConfirmPassword = () => {
    if (!confirmPasswordValue) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (confirmPasswordValue !== passwordValue) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };
  const code =Math.random().toString(36).substring(2,7);
  const handleNext = async(e) => {
    const isEmailValid = validateEmail();
    const isCodeValid = validateCode();
    if (isEmailValid && isCodeValid) {
      await checkCode(emailValue,codeValue)
        .then((res) => {
          console.log(res.data);
          if (res.data === 'verified') {
            const container = document.getElementById("container");
            container.classList.add("right-panel-active");

          }
          else
          {
            setMessage("You have entered a invalid code!!");
            toast.error("The code is not valid")
          }
        })
    }
  };
  const handleCode = async (e) => {
    e.preventDefault();
    try {
      await getCode(emailValue)
      .then((res)=>{
          if (res.data === "Email sent successfully") {
            toast.success("Code has been sent");
            setIsCodeSent(true);
            setIsResendDisabled(true);
            let timer = 60;
            const countdown = setInterval(() => {
              timer--;
              setResendTimer(timer);
              if (timer <= 0) {
                clearInterval(countdown);
                setIsResendDisabled(false);
              }
            }, 1000);
            setTimeout(() => {
              setMessage("Verification code has been sent to your email");
            }, 1000);
          }
        else{
          toast.error("EMAIL NOT SENT")
        }
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  };
  const handlePassword = async() => {
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    //  {
      try {
     await changePassword(emailValue,passwordValue,code)
      .then((res) => { 
        if(res.data==="PASSWORD CHANGED")
        toast.success("PASSWORD CHANGED");
        else
        toast.error("SOMETHING WENT WRONG");
        console.log(res);
        console.log(code); })
      }catch (error){
          toast.error("SOMETHING WENT WRONG")
        }
  };

  const togglePasswordVisibilityForgotPass = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const togglePasswordVisibilityForgotConfirm = () => {
    setConfirmVisibility(!isConfirmVisible);
  };

  return (
    <>
      <div className="doop">
        <div className="container" id="container">
          <div className="form-container email-container">
            <form
              action="#"
              className="email-verification-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="email_verification">Email verification</h1>
              <span className="forgot_email_out">Email</span>
              <input
                type="email"
                placeholder="Email"
                value={emailValue}
                className="forgot_email"
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
              <button
                className="code_text"
                onClick={handleCode}
                disabled={isCodeSent}
              >
                {isCodeSent ? "Code Sent" : "Send Code"}
              </button>
              <span className="forgot_code_out">Verification Code</span>
              <input
                type="text"
                placeholder="Code"
                value={codeValue}
                className="forgot_code"
                onChange={(e) => setCodeValue(e.target.value)}
                required
              />
              <span className="error-message-7">{codeError}</span>
              <button
                className="resend_code_text"
                onClick={handleCode}
                disabled={isResendDisabled}
              >
                <span className="didnt_code">Didn't receive code? </span>
                {isResendDisabled
                  ? `Resend Code (${resendTimer})`
                  : "Resend Code"}
              </button>
              <button
                className="next_button"
                id="nextButton"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </form>
          </div>

          <div className="form-container password-container">
            <form
              action="#"
              className="reset-password-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="reset_password">Reset your password</h1>
              <span className="reset_password_out">Password</span>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your new Password"
                value={passwordValue}
                className="password_first"
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
              <img
                src={isPasswordVisible ? eyes_open : eyes_closed}
                alt="Toggle Password Visibility"
                className="toggle-visibility-icon-pass"
                onClick={togglePasswordVisibilityForgotPass}
              />
              <span className="error-message-8">{passwordError}</span>
              <span className="confirm_password_out">Confirm Password</span>
              <input
                type={isConfirmVisible ? "text" : "password"}
                placeholder="Confirm your Password"
                value={confirmPasswordValue}
                className="confirm_password"
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                required
              />
              <img
                src={isConfirmVisible ? eyes_open : eyes_closed}
                alt="Toggle Password Visibility"
                className="toggle-visibility-icon-confirm"
                onClick={togglePasswordVisibilityForgotConfirm}
              />
              <span className="error-message-9">{confirmPasswordError}</span>
              <button
                className="change_button"
                type="button"
                onClick={handlePassword}
              >
                Change password
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <img src={password} alt="password logo" />
                <span className="span_text">
                  Please type your new password with at least 6 characters, 1
                  symbol, and 1 number
                </span>
              </div>
              <div className="overlay-panel overlay-right">
                <img src={email} alt="email logo" />
                <span className="span_text">{message}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="background-image"></div>
      </div>
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
    </>
  );
}

export default Forgot;
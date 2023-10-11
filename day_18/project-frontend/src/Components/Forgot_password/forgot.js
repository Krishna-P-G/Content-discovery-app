import "./forgot.css";
import { useState} from "react";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import eyes_closed from "../../assets/eyes-close.png";
import eyes_open from "../../assets/uchiha-eyes.png";

function Forgot() {
  const [emailValue, setEmailValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState(
    "Please enter your email for changing your password"
  );
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmVisible, setConfirmVisibility] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  function generateRandomOTP(length = 6) {
    const charset = "0123456789";
    let OTP = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      OTP += charset[randomIndex];
    }

    return OTP;
  }

  const handleVerify = (e) => {
    e.preventDefault();
    if (emailValue === "") {
      toast.error("Enter your email address");
    } else {
      axios
        .get(`http://localhost:8080/login/verifybyemail/${emailValue}`)
        .then((res) => {
          
          console.log(res.data);
          if (res.data === "Email verified") {
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
              axios
                .post(`http://localhost:8080/get-code/${emailValue}`)
            }, 1000);
          } else {
            toast.error(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validateCode = () => {
    const codeResult = axios.get(`http://localhost:8080/checkcode/${emailValue}/${codeValue}`)
    if (!codeValue) {
      toast.error("Please enter verification code");
      return false;
    } else if (codeResult === "verified" ) {
      setCodeError("");
      return true;
    } else {
      toast.error("The verification code is not correct!");
      return false;
    }
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
      toast.error("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const handleNext = () => {
    const isCodeValid = validateCode();
    if (emailValue !== "" && isCodeValid) {
      const container = document.getElementById("container");
      container.classList.add("right-panel-active");
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid) {
      axios
        .put("http://localhost:8080/login/updatePassword", {
          email: emailValue,
          password: passwordValue,
          code:otp,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "Password changed successfully") {
            toast.success("Password Changed");
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } else {
            toast.error(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
                onClick={handleVerify}
                disabled={isCodeSent}
              >
                {isCodeSent ? "Code Sent" : "Send Code"}
              </button>
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
                onClick={handleVerify}
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

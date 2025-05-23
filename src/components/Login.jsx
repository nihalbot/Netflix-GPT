import { useState } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  cheekValidEmail,
  cheekValidPassword,
  cheekValidFullName,
} from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [emailvalid, setEmailValid] = useState(null);
  const [passwordvalid, setPasswordValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);

  const [authFail, setAuthFail] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    const response = cheekValidEmail(email);
    setEmailValid(response);
  };
  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    const response = cheekValidPassword(password);
    setPasswordValid(response);
  };
  const handleFullname = (e) => {
    const name = e.target.value;
    setFullname(name);
    const response = cheekValidFullName(fullname);
    setNameValid(response);
  };

  const handleButtonClick = () => {
    //  const reponse =  cheekValidData(email.current.value, password.current.value);
    //  setValid(reponse);
    //  console.log(reponse);

    if (emailvalid || passwordvalid) return;

    if (signup) {
      //sign up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Sign up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch(() => {});
        })
        .catch((error) => {
          const errorMessage = error.message;
          setAuthFail(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/browse");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setAuthFail(errorMessage);
        });
    }
  };

  const toggleSignin = () => {
    setSignup(!signup);
  };
  return (
    <div className="">
      <Header />
      <div className="relative w-full hidden md:block">
        <img
          className="h-screen w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/BD-en-20250512-TRIFECTA-perspective_790eb47b-682d-4323-95e2-5a154cc7f58a_medium.jpg"
          alt="login_bg_img"
        ></img>
        <div className="absolute "></div>
      </div>
      <div className="absolute w-full h-screen md:w-4/12 md:max-h-max md:pb-10 bg-black md:bg-black/80 md:top-20 mx-auto left-0 right-0 text-white px-10 md:rounded-md">
        <form onSubmit={(e) => e.preventDefault()} className="mt-30 md:mt-10">
          <h2 className="text-3xl font-bold">
            {signup ? "Signup" : "Sign In"}
          </h2>
          {signup && (
            <input
              className="mt-5 w-full border border-[#C1C1C1] focus:outline focus:outline-blue-500 rounded-md py-3 px-2"
              type="text"
              placeholder="Your Name"
              value={fullname}
              onChange={handleFullname}
            />
          )}
          <p
            className={`text-red-500 font-bold ${
              !nameValid ? "mt-0" : "mt-5"
            } text-md`}
          >
            {nameValid}
          </p>
          <input
            //  ref={email}
            className="mt-5 w-full border border-[#C1C1C1] focus:outline focus:outline-blue-500 rounded-md py-3 px-2"
            type="text"
            placeholder="Email or mobile number"
            value={email}
            onChange={handleEmail}
          />
          <p
            className={`text-red-500 font-bold ${
              !emailvalid ? "mt-0" : "mt-5"
            } text-md`}
          >
            {emailvalid}
          </p>
          <input
            // ref={password}
            className="w-full py-3 px-2 border border-[#C1C1C1] rounded-md mt-5"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          {!signup ? (
            " "
          ) : (
            <p
              className={` text-red-500 font-bold ${
                !passwordvalid ? "mt-0" : "mt4"
              } text-md`}
            >
              {passwordvalid}
            </p>
          )}
          <p
            className={` text-red-500 font-bold ${
              !authFail ? "mt-0" : "mt-4"
            } text-md`}
          >
            {authFail}
          </p>
          <button
            className="w-full text-white py-3 px-2 bg-red-600 rounded-md mt-10 cursor-pointer transition-all duration-300 ease-in hover:bg-red-700 "
            onClick={handleButtonClick}
          >
            {signup ? "Sign Up" : "Sign In"}
          </button>

          <p onClick={toggleSignin} className="mt-4 cursor-pointer">
            {signup
              ? "Already user? Sign in now"
              : "New to Netflix? Sign up now."}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;

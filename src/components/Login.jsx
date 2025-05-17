import { useState } from "react";
import Header from "./Header";
const Login = ()=>{
  const [signup, setSignup] = useState(false);
  console.log(signup);
  const handleSignup = ()=>{
    setSignup(!signup);
  }
    return (
      <div className="">
        <Header />
        <div className="relative w-full hidden md:block">
          <img
            className="h-screen w-full"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/BD-en-20250512-TRIFECTA-perspective_790eb47b-682d-4323-95e2-5a154cc7f58a_medium.jpg"
            alt="login_bg_img"
          ></img>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black from-70%"></div>
        </div>
        <div className="absolute w-full h-screen md:w-4/12 md:h-120 bg-black/80 md:top-30 mx-auto left-0 right-0 text-white px-10 rounded-md">
          <form className="mt-30 md:mt-10">
            <h2 className="text-3xl font-bold">{signup ? "Signup" : "Sign In"}</h2>
            {signup && (
              <input
                className="mt-5 w-full border border-[#C1C1C1] focus:outline focus:outline-blue-500 rounded-md py-3 px-2"
                type="text"
                placeholder="Your Name"
              />
            )}
            <input
              className="mt-5 w-full border border-[#C1C1C1] focus:outline focus:outline-blue-500 rounded-md py-3 px-2"
              type="text"
              placeholder="Email or mobile number"
            />
            <input
              className="w-full py-3 px-2 border border-[#C1C1C1] rounded-md mt-5"
              type="password"
              placeholder="Password"
            />
            <button className="w-full text-white py-3 px-2 bg-red-600 rounded-md mt-5 cursor-pointer transition-all duration-300 ease-in hover:bg-red-700 ">
              Sign In
            </button>

            <p onClick={handleSignup} className="mt-4 cursor-pointer">
              {signup
                ? "Already user? Sign in now"
                : "New to Netflix? Sign up now."}
            </p>
          </form>
        </div>
      </div>
    );
}
export default Login;
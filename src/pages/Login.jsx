import React, { useContext, useState } from "react";
import { loginUser } from "../api/request";
import VideoBg from "../assets/video.mp4";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { Signup } from "../components/Signup";
import { Spinner } from "../components/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const [activeSignup, setActiveSignup] = useState(false);
  const[loading,setLoading]=useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data: token } = await loginUser(email, password);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      localStorage.setItem("token", token);
      window.location = "/home";
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // toast.error(error)
      alert(error)
    
    }
  };

  return (
    <>
      <div className="relative grid place-content-center h-[100vh] ">
        <video
          className="absolute w-[100vw] h-[100vh] object-cover "
          src={VideoBg}
          autoPlay={true}
          loop
          muted
        />
        {activeSignup ? (
          <Signup setActiveSignup={setActiveSignup} />
        ) : (
          <div
            id="login-card"
            className="relative z-10 w-[40rem] h-[40rem] bg-white "
          >
            <header className="p-8">
              <p className="text-white font-bold text-3xl">Login</p>
            </header>
            <form onSubmit={handleLogin} className="body p-8 ">
              <label className="text-white text-2xl" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="block w-full my-4 h-[50px] rounded-lg px-3 text-2xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                className="text-white text-2xl inline-block mt-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-full my-4 h-[50px] rounded-lg px-3 text-2xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
              disabled={!email||!password}
                onClick={handleLogin}
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-full h-[50px]   text-2xl mt-4"
              >
                {loading?
                <Spinner/>:"Login"
                }
          
              </button>
              <p className="text-white mt-3 text-xl flex gap-x-3">
                Don't have an account?{" "}
                <span
                  onClick={() => setActiveSignup(true)}
                  className="underline cursor-pointer"
                >
                  Signup
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    
    </>
  );
}

export default Login;

import React, { useContext, useState } from "react";
import { signupUser } from "../api/request";
import VideoBg from "../assets/video.mp4";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import { Spinner } from "./Spinner";

export const Signup = ({ setActiveSignup }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: token } = await signupUser(fullname, email, password);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      localStorage.setItem("token", token);
      window.location = "/home";
      setLoading(false);
    } catch (error) {
      // toast.error(error)
      setLoading(false);
      alert(error.response.data);
    }
  };

  return (
    <>
      <div
        id="login-card"
        className="relative z-10 w-[40rem] h-[50rem] bg-white "
      >
        <header className="p-8">
          <p className="text-white font-bold text-3xl">Signup</p>
        </header>
        <form onSubmit={handleSignup} className="body p-8 ">
          <label className="text-white text-2xl" htmlFor="email">
            Fullname
          </label>
          <input
            id="text"
            type="text"
            className="block w-full my-4 h-[50px] rounded-lg px-3 text-2xl"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label className="text-white text-2xl" htmlFor="email">
            Email
          </label>
          <input
            required
            id="email"
            type="email"
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
            disabled={!fullname || !email || !password}
            onClick={handleSignup}
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-full h-[50px]   text-2xl mt-4"
          >
            {loading ? <Spinner /> : "Signup"}
          </button>
          <p className="text-white mt-3 text-xl flex gap-x-3">
            Have an account?{" "}
            <span
              onClick={() => setActiveSignup(false)}
              className="underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GithubIcon } from "../utills/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/features/userSlice";
function SignIn() {
  const [formData, setFormData] = useState({});

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const data = await fetch("/api/v1/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      const { user, accessToken } = data.data;
      dispatch(signInSuccess({ user, accessToken }));

      navigate("/");
    } catch (error) {
      console.log(error);

      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="min-h-screen dark:bg-gray-800 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 dark:bg-gray-800 border dark:border-slate-600 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button className="w-full bg-slate-200 dark:bg-slate-900  max-w-xs font-bold shadow-sm rounded-lg py-3 text-gray-800 dark:text-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>

                <button className="w-full mb-10 max-w-xs font-bold shadow-sm rounded-lg py-3 bg-slate-200 dark:bg-slate-900 text-gray-800 dark:text-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                  <div className=" p-1 rounded-full">
                    <GithubIcon />
                  </div>
                  <span className="ml-4">Sign In with GitHub</span>
                </button>
              </div>
              <hr className="mb-10 dark:border-gray-600" />
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      onChange={handleChange}
                      className="mb-4 dark:autofill:transition-colors dark:autofill:duration-[5000000ms] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="emelia_erickson24"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      className="mb-4 dark:autofill:transition-colors dark:autofill:duration-[5000000ms] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-400 dark:focus:ring-blue-800"
                  >
                    {loading ? "Loading" : "Sign In"}
                  </button>
                </form>
                <div className="text-red-900 dark:text-gray-200 text-center">
                  {error ? "Something went Wrong" : ""}
                </div>
                <div className="my-12 text-center">
                  <div className="leading-none px-2 inline-block text-sm dark:text-white tracking-wide transform translate-y-1/2">
                    Or{" "}
                    <Link
                      to="/sign-up"
                      className="font-medium cursor-pointer text-blue-600 border-gray-600"
                    >
                      Sign Up with e-mail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 dark:bg-slate-500 rounded-e-lg text-center hidden lg:flex">
          <div className="my-8 mx-4 bg-transparent w-full bg-cover bg-[40%] bg-no-repeat bg-[url('./assets/zoro.jpg')]"></div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

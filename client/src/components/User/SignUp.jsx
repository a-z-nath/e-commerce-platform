import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/features/userSlice.js";

function SignUp() {
  const initialState = {
    fullName: "",
    email: "",
    userName: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      dispatch(signUpStart());

      const data = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      console.log(data);

      if (data.success === false) {
        dispatch(signUpFailure(data));
        return;
      }
      dispatch(signUpSuccess());
      navigate("/sign-in");
    } catch (error) {
      signUpFailure(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen dark:bg-gray-800 text-gray-900 flex justify-center">
      <section className="max-w-screen-xl m-0 sm:m-10 dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className=" w-full mt-0 bg-gray-100 md:rounded-ee-none md:rounded-s-lg shadow dark:border md:pt-50 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 mt-24 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Emelia Erickson"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="erickson24@gmail.com"
                  onChange={handleChange}
                  required
                />
              </div>
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
                  className="form-input dark:autofill:transition-colors dark:autofill:duration-[5000000ms] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="emelia_erickson24"
                  onChange={handleChange}
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
                  className="form-input dark:autofill:transition-colors dark:autofill:duration-[5000000ms] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Loading" : "Create an account"}
              </button>
              {error ? error : ""}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  to="/sign-in"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-slate-200 dark:bg-slate-500 rounded-e-2xl text-center hidden lg:flex">
          <div className="my-8 mx-4 bg-transparent w-full bg-cover bg-[40%] bg-no-repeat bg-[url('./assets/luffy.jpg')]"></div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;

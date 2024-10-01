import React from "react";
import { InfoIcon } from "./Icons";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  return (
    <section className="bg-white mb-4 dark:bg-gray-900 ">
      <div className="container flex items-center min-h-fit px-6 pt-8 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-yellow-400 rounded-full bg-blue-50 dark:bg-gray-800">
            <InfoIcon className="w-6 h-6 p-1 md:w-8 md:h-8" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button
              onClick={toHome}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;

import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-screen dark:bg-gray-800">
      <div className="flex flex-col justify-around max-w-lg  px-4 mx-auto dark:bg-gray-800 lg:pt-16 lg:flex-row md:px-8 lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="pt-16 mb-16 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5 xl:max-w-xl">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg xl:max-w-screen-xl mb-6 font-sans text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-bold tracking-tight dark:text-gray-100 sm:text-4xl sm:leading-none">
              Warm up this winter with{" "}
              <span className="">exclusive discounts </span>on our top products!
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-700 hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-950 focus:shadow-outline focus:outline-none"
            >
              Explore Our Store
            </Link>
          </div>
        </div>
        <div className="lg:block hidden m-0 p-0 md:pr-10">
          <div className="relative mx-auto border-gray-800 dark:border-gray-950 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-950 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-950 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-950 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-950 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-transparent dark:bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1515938736719-95b568dc8dd8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-[272px] h-[572px] object-cover"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

import React from "react";
import { Link } from "react-router-dom";
import { GithubIcon, LinkedInIcon, TwitterIcon } from "../utills/Icons";

function Footer() {
  return (
    <div className="dark:text-white">
      <hr className="text-gray-600 dark:text-gray-800" />
      <footer className="dark:bg-gray-800 py-5 font-sans tracking-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-8">
          <div>
            <h4 className="text-lg font-semibold mb-6 dark:text-white">
              About Us
            </h4>
            <p className="dark:text-gray-400 text-gray-700 text-base text-balance">
              This website is a development platform showcasing user
              interactivity and{" "}
              <span className="font-bold">admin dashbard </span>management for
              e-commerce platform. It is intended to provide developers with a
              resource for learning,{" "}
              <span className="font-semibold">experimentation</span>, and
              inspiration. All content and code are for{" "}
              <span className="font-semibold">demonstration purposes</span>{" "}
              only.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 dark:text-white">
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="dark:text-gray-400 text-gray-700 hover:text-gray-800 dark:hover:text-white text-base"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="dark:text-gray-400 text-gray-700 hover:text-gray-800 dark:hover:text-white text-base"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="dark:text-gray-400  text-gray-700 hover:text-gray-800 dark:hover:text-white text-base"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="dark:text-gray-400  text-gray-700 hover:text-gray-800 dark:hover:text-white text-base"
                >
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 dark:text-white">
              Contact Us
            </h4>
            <p className="dark:text-gray-400 text-gray-700 text-base">
              123 Main Street
            </p>
            <p className="dark:text-gray-400 text-gray-700  text-base">
              City, State, Country
            </p>
            <p className="dark:text-gray-400 text-gray-700  text-base">
              contact@example.com
            </p>
            <p className="dark:text-gray-400 text-gray-700  text-base">
              +1 234 567 890
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Follow Us</h4>

            <ul className="flex flex-wrap gap-x-5 gap-4">
              <li>
                <a href="https:github.com/a-z-nath" className="text-xl">
                  <GithubIcon />
                </a>
              </li>

              <li>
                <Link href="/" className="text-xl">
                  <LinkedInIcon />
                </Link>
              </li>

              <li>
                <Link to="/" className="text-xl">
                  <TwitterIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 p-5 mt-12">
          <p className="text-gray-400 text-base text-center">
            © <span className="font-bold">Saree & Panjabi</span>. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "../utills/Icons";

const Profile = () => {
  const { currentUser, loading, error, accessToken, refreshToken } =
    useSelector((state) => state.user);

  const dummyAvatar =
    "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className=" dark:bg-slate-800 gap-6 flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-gray-700 w-3/4 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-300 transform">
        <div className="flex items-center justify-between gap-4">
          <img
            src={currentUser.avatar || dummyAvatar}
            className="w-80 group-hover:w-1/2 group-hover:h-88 h-80 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
            alt={currentUser.fullName}
          />
          <div className="w-fit transition-all transform duration-500">
            <h1 className="text-gray-600 dark:text-gray-200 font-bold">
              {currentUser.fullName}
            </h1>
            <p className="text-gray-400">
              {currentUser.isAdmin
                ? "Error has to be fixed :("
                : "Error Generator"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-200 duration-250">
              {currentUser.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

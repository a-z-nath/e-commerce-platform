import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkMoodIcon, LightMoodIcon } from "./Icons";
import { toggleTheme } from "../../redux/features/themeSlice";

function Theme() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <div className="dark:text-gray-50 md:mr-0">
      <button
        className="md:w-10 md:h-10 h-8 w-8 border-2 p-1 rounded-full border-gray-700 dark:border-gray-700"
        onClick={(e) => {
          console.log(e, theme);

          dispatch(toggleTheme());
        }}
      >
        {theme !== "dark" ? (
          <LightMoodIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto" />
        ) : (
          <DarkMoodIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto" />
        )}
      </button>
    </div>
  );
}

export default Theme;

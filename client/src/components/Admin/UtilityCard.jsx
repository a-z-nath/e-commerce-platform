import React from "react";

function UtilityCard({ title, icon, total, time, loading }) {
  return (
    <div className="dark:bg-gray-600 bg-gray-50 col-span-1 w-80 md:w-[264px] lg:w-80 h-fit shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 max-w-[512px] rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-2">
      <div className="flex items-center">
        <h3 className="text-2xl font-semibold mr-4 text-gray-900 dark:text-white flex-1">
          {title}
        </h3>
        <div className="dark:bg-gray-700 bg-gray-100 dark:text-gray-300 w-12 h-12 p-1 flex items-center justify-center rounded-full cursor-pointer">
          {icon}
        </div>
      </div>

      <div className="font-medium h-full text-4xl text-center text-gray-800 dark:text-gray-200 my-2 leading-relaxed">
        {loading ? (
          <div className="h-full flex gap-4 items-center justify-center">
            <div
              className="w-16 h-16 rounded-full animate-spin
                    border-4 border-solid border-green-500 border-t-transparent"
            ></div>
          </div>
        ) : (
          total
        )}
      </div>

      <div className="flex items-center">
        <h3 className="text-lg text-gray-500 text-center flex-1">{time}</h3>
      </div>
    </div>
  );
}
export default UtilityCard;

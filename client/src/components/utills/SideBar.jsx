import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Avatar,
  Comments,
  DashboardIcon,
  Delivery,
  FaUsersGear,
  IoAddCircleOutline,
  Product,
  TransactionIcon,
} from "./Icons";
import { useSelector } from "react-redux";

function SideBar({ tabs }) {
  return (
    <div className="grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_4fr] rounded bg-gray-50 py-4 px-3 dark:bg-gray-800">
      <nav className="bg-slate-100 dark:bg-slate-800 dark:text-white py-2 drop-shadow-sm font-[sans-serif] overflow-auto md:top-[60px] min-h-full">
        <div className="relative flex flex-col h-full">
          <ul className="space-y-3 my-0 flex-1">
            {tabs.map((tab, index) => (
              <li key={index}>
                <NavLink
                  to={tab.to}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isActive
                        ? "text-[#007bff] bg-gray-200 dark:bg-slate-600 border-r-[5px] border-[#077bff]"
                        : ""
                    }   px-8 py-4 text-base transition-all`
                  }
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="ml-4 mt-4 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBar;

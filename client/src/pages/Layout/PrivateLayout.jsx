import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/utills/SideBar";
import {
  Avatar,
  Comments,
  DashboardIcon,
  Delivery,
  FaUsersGear,
  IoAddCircleOutline,
  Product,
  TransactionIcon,
} from "../../components/utills/Icons";

const AdminTabs = [
  {
    to: "/admin/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon className="mr-4 w-4 h-4" />,
  },
  {
    to: "/admin/profile",
    name: "Profile",
    icon: <Avatar className="mr-4 w-4 h-4" />,
  },
  {
    to: "/admin/products",
    name: "Products",
    icon: <Product className="mr-4 w-4 h-4" />,
  },
  {
    to: "/admin/add-product",
    name: "Add Products",
    icon: <IoAddCircleOutline className="mr-4 w-4 h-4" />,
  },
  {
    to: "/admin/users",
    name: "Users",
    icon: <FaUsersGear className="mr-4 w-4 h-4" />,
  },
  {
    to: "/admin/transactions",
    name: "Transactions",
    icon: <TransactionIcon className="mr-4 w-4 h-4" />,
  },
  {
    to: "/admin/comments",
    name: "Comments",
    icon: <Comments className="mr-4 w-4 h-4" />,
  },
];

const UserTabs = [
  {
    to: "/user/profile",
    name: "Profile",
    icon: <Avatar className="mr-4 w-4 h-4" />,
  },
  {
    to: "/user/order",
    name: "Your Orders",
    icon: <Delivery className="mr-4 w-4 h-4" />,
  },
];
function PrivateLayout({ user }) {
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  const tabs = user?.isAdmin ? AdminTabs : UserTabs;
  return (
    <SideBar tabs={tabs}>
      <Outlet />
    </SideBar>
  );
}

export default PrivateLayout;

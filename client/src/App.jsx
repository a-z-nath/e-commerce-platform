import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import PrivateLayout from "./pages/Layout/PrivateLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Home from "./pages/Home/Home";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import PageNotFound from "./components/utills/PageNotFound";
import SideBar from "./components/utills/SideBar";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import Order from "./components/User/Order";
import AdminLayout from "./pages/Layout/AdminLayout";
import UsersList from "./pages/Admin/UsersList";
import AddProduct from "./pages/Admin/AddProduct";
import ProductsList from "./pages/Admin/ProductsList";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  const user = useSelector((state) => state.user?.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/product/1" element={<ProductDetails />} />
          <Route element={<PrivateLayout user={user} />}>
            <Route path="/admin" element={<AdminLayout user={user} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/products" element={<ProductsList />} />
            </Route>
            <Route path="/user">
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/order" element={<Order />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

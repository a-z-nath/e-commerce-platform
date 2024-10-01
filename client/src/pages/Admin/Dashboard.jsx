import React, { useEffect, useState } from "react";
import UtilityCard from "../../components/Admin/UtilityCard";
import { FaUserGroup } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuPackagePlus } from "react-icons/lu";

function Dashboard() {
  const [users, setUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState();
  const [products, setProducts] = useState(null);
  const [totalProducts, setTotalProducts] = useState();
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await fetch("/api/v1/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => res.json());
        if (data.success) {
          setUsers(data.data?.users);
          setTotalUsers(data.data?.totalUsers);

          console.log(users, totalUsers);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetch("/api/v1/products", {
          method: "GET",
        }).then((res) => res.json());

        if (data.success) {
          console.log(data.data);
          setProducts(data.data?.products);
          setTotalProducts(data.data?.totalProducts);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchUsers();
    fetchProducts();
  }, [currentUser, accessToken]);
  return (
    <div className="flex flex-wrap flex-col md:flex-row justify-center md:gap-4">
      <Link to="/admin/users">
        <UtilityCard
          loading={loading}
          title={"Total Users"}
          icon={<FaUserGroup />}
          time={"last month"}
          total={totalUsers}
        />
      </Link>

      <Link to="/admin/products">
        <UtilityCard
          loading={loading}
          title={"Total Products"}
          icon={<LuPackagePlus />}
          time={"last month"}
          total={totalProducts}
        />
      </Link>
    </div>
  );
}

export default Dashboard;

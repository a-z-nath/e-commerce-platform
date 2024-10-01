import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UsersList() {
  const [users, setUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState();
  const { accessToken } = useSelector((state) => state.user);
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
    fetchUsers();
  }, []);
  return (
    <div className="h-full font-[sans-serif] overflow-x-auto">
      {loading && (
        <div className="h-full flex gap-4 items-center justify-center">
          <div
            className="w-4 h-4 rounded-full animate-spin
                    border-4 border-solid border-green-500 border-t-transparent"
          ></div>
          <div>Loading</div>
        </div>
      )}
      {users && (
        <table className="min-w-[520px] w-full dark:text-slate-200 rounded-lg bg-gray-300 dark:bg-gray-600">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-semibold ">
                Full Name
              </th>
              <th className="p-4 text-left text-sm font-semibold ">
                Role
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2"
                  viewBox="0 0 401.998 401.998"
                >
                  <path
                    d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                    dataoriginal="#000000"
                  />
                </svg>
              </th>
              <th className="p-4 text-left text-sm font-semibold ">
                username
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2"
                  viewBox="0 0 401.998 401.998"
                >
                  <path
                    d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                    dataoriginal="#000000"
                  />
                </svg>
              </th>
              <th className="p-4 text-left text-sm font-semibold ">
                Email
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2"
                  viewBox="0 0 401.998 401.998"
                >
                  <path
                    d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                    dataoriginal="#000000"
                  />
                </svg>
              </th>
              <th className="p-4 text-left text-sm font-semibold ">Delete</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {users.map((user, index) => (
              <tr
                key={index}
                className="odd:bg-blue-50 odd:text-slate-100 dark:odd:bg-gray-500"
              >
                <td className="p-4 text-sm">
                  <div className="flex items-center cursor-pointer w-max">
                    <div className="ml-4">
                      <p className="text-sm ">{user.fullName}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm ">
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td className="p-4 text-sm ">{user.userName}</td>
                <td className="p-4 text-sm ">{user.email}</td>
                <td className="p-4 text-sm text-red-700">delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !users && <div>there is no users.</div>}
    </div>
  );
}

export default UsersList;

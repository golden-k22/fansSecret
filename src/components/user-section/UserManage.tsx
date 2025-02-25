'use client'
import React, { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
};

// type UserManageProps = {
//   users: User[];
// };

const UserManage = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async (query: string) => {
    const response = await fetch(`/api/user/alluser?query=${query}`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    // Fetch all users initially
    fetchUsers("");
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchUsers(query);
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">User ID</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Age</th>
          <th className="border border-gray-300 p-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">{user.id}</td>
            <td className="border border-gray-300 p-2">{user.name}</td>
            <td className="border border-gray-300 p-2">{user.age}</td>
            <td className="border border-gray-300 p-2">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserManage;
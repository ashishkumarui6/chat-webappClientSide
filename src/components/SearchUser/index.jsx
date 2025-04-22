import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import CircularLoading from "../CircularLoading";
import UserCard from "../UserCard";
import toast from "react-hot-toast";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = async () => {
    const URL = "http://localhost:8080/api/search-user";
    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);

      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  console.log("searchUser 30303030", searchUser);
  return (
    <div className="fixed inset-0  bg-opacity-40 z-50 flex items-start justify-center p-4">
      {/* Close Button */}
      <button
        className="absolute top-0 right-0 text-gray-600 hover:text-white p-2 text-2xl"
        onClick={onClose}
      >
        <IoClose size={28} />
      </button>
      <div className="relative w-full max-w-lg mt-20 space-y-4">
        {/* Search Input */}
        <div className="bg-white rounded h-14 overflow-hidden flex items-center shadow">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full h-full px-4 py-2 outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex items-center justify-center text-gray-500">
            <IoSearchOutline size={22} />
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded shadow p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {loading && <CircularLoading />}

          {!loading && searchUser.length === 0 && (
            <p className="text-center text-slate-500">No user found!</p>
          )}

          {!loading &&
            searchUser.length > 0 &&
            searchUser.map((user) => (
              <UserCard key={user._id} user={user} onClose={onClose} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;

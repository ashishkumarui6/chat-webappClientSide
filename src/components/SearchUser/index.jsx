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
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        {/* input searchUser */}
        <div className="bg-white rounded h-14 overflow-hidden flex items-center">
          <input
            type="text"
            placeholder="search user by name, email...."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex items-center justify-center">
            <IoSearchOutline />
          </div>
        </div>
        {/* display search user */}

        <div className="bg-white mt-2 w-full p-4 rounded">
          {/* no user found */}
          {searchUser.length === 0 && !loading && (
            <div>
              <p className="text-center text-slate-500">no user found!</p>
            </div>
          )}

          {loading && <CircularLoading />}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return <UserCard key={user._id} user={user} onClose={onClose} />;
            })}
        </div>
      </div>
      <div>
        <button
          className="absolute top-0 right-0 text-lg p-2 lg:text-4xl hover:text-white"
          onClick={onClose}
        >
          <IoClose size={25} />
        </button>
      </div>
    </div>
  );
};

export default SearchUser;

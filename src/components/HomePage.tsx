import React from "react";
import { useSelector } from "react-redux";
import { auth } from ".././firebase.config";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  interface RootState {
    user: any;
  }
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <div>
      <nav className="flex justify-between p-5 bg-blue-500 text-white">
        <div>
          <button className="mr-4">Home</button>
          <button>Product</button>
        </div>
        <div>
          <span className="mr-4">{user.users.displayName}</span>
          <button onClick={signOut}>Logout</button>
        </div>
      </nav>
      <div className="p-5">
        {user.users.length === 0 ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-24 w-24"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-xl font-bold mb-2">
              User Details
            </h2>
            <p className="mb-2">
              Display Name:{" "}
              <span className="font-semibold">{user.users.displayName}</span>
            </p>
            <p className="mb-2">
              Number: <span className="font-semibold">{user.users.number}</span>
            </p>
            <p className="mb-2">
              Email: <span className="font-semibold">{user.users.email}</span>
            </p>
            <p className="mb-2">
              Logged in at:{" "}
              <span className="font-semibold">
                {new Date().toLocaleTimeString()}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

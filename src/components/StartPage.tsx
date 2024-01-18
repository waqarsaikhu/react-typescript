import { useState } from "react";
import SignupModal from "./modal/SignupModal";
import LoginModal from "./modal/LoginModal";

const StartPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeModal = () => {
    setShowSignupModal(false);
    setShowLoginModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">App Name</h1>
        <div className="flex space-x-4 items-center justify-center mb-6">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
          <button
            onClick={() => setShowSignupModal(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
          >
            SignUp
          </button>
        </div>

        {showLoginModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            <div className="z-10 bg-white p-8 rounded shadow-md max-w-md">
              <LoginModal />
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showSignupModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            <div className="z-10 bg-white p-8 rounded shadow-md max-w-md">
              <SignupModal />
              <button
                onClick={closeModal}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartPage;

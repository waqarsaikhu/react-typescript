import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const SignupModal = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [number, setNumber] = useState("");

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);
  const handleDisplayNameChange = (event: any) =>
    setDisplayName(event.target.value);
  const handleNumberChange = (event: any) => setNumber(event.target.value);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be minimum 8 characters with a combination of numbers and characters. No special characters allowed."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        number,
        email,
      });

      setEmail("");
      setPassword("");
      setDisplayName("");
      setNumber("");
      alert("You signed up successfully. Now please login.");
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-gray-600 block mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="displayName" className="text-gray-600 block mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            onChange={handleDisplayNameChange}
            placeholder="Enter your display name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="number" className="text-gray-600 block mb-1">
            Number
          </label>
          <input
            type="text"
            id="number"
            onChange={handleNumberChange}
            placeholder="Enter your number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupModal;

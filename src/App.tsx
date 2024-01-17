import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import { useDispatch } from "react-redux";
import { fetchUser } from "../src/redux/user/userSlice";
import { auth } from "./firebase.config";
import { useEffect } from "react";
import type { AppDispatch } from "./store";
import HomePage from "./components/HomePage";
import ProductPage from "./components/Product";
import ProductDetails from "./components/ProductDetails";
function App() {
  // interface RootState {
  //   user: any;
  // }
  // const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        dispatch(fetchUser(userId));
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

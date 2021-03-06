import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login";
import Home from "./components/Home/Home"
import Account from "./components/User/Account/Account";
import About from "./components/About/About"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { AuthContext } from "./components/Context/AuthContext";
import { RequireAuth } from "./components/Context/RequireAuth";
import CreatePost from "./components/Coupon/Create/Create"
import Detail from "./components/Coupon/Detail/Detail";


function App() {
  //keep track of login state in global
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Router>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Navbar />
          <div className="container">
            <Routes>
              {/* <Route path="/" element={<RequireAuth><Home /></RequireAuth>} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
              <Route path="/post/create" element={<RequireAuth><CreatePost /></RequireAuth>} />
              <Route path="/post/detail/:id" element={<Detail />} />
            </Routes>
          </div>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;

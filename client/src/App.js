import Signup from "./components/User/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

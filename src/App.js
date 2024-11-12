import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/about" element={<About />} />
          {/* <Route exact path="page2" element={<Page2 />} />
          <Route exact path="page3" element={<Page3 />} /> */}
        </Routes>
     
      </Router>
    </>
  );
}

export default App;
